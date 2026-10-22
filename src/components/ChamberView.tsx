import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { LOCATIONS } from '../data/locationsData';
import { PuzzleRenderer } from './PuzzleRenderer';
import { ArrowLeft, Key, Lock, Unlock, HelpCircle, Eye, ChevronRight } from 'lucide-react';
import { soundFx } from '../utils/audio';

type SequenceStage =
  | 'idle'
  | 'puzzle_solved'
  | 'key_revealed'
  | 'key_collected'
  | 'panel_fade_out'
  | 'key_enter_lock'
  | 'door_opening'
  | 'doorway_zoom';

export const ChamberView: React.FC = () => {
  const {
    selectedLocationId,
    activeChamberNumber,
    progress,
    goToMap,
    advanceToNextChamber,
    solvePuzzle,
    collectKey,
    unlockDoor,
    useHint
  } = useGame();

  const [sequenceStage, setSequenceStage] = useState<SequenceStage>('idle');
  const [showClueModal, setShowClueModal] = useState<boolean>(false);
  const [showHintModal, setShowHintModal] = useState<boolean>(false);
  const [panelMinimized, setPanelMinimized] = useState<boolean>(false);

  const location = LOCATIONS.find(l => l.id === selectedLocationId);
  const puzzle = location?.puzzles.find(p => p.number === activeChamberNumber);

  // Reset stage when chamber number changes
  useEffect(() => {
    setSequenceStage('idle');
    setPanelMinimized(false);
  }, [activeChamberNumber, selectedLocationId]);

  if (!location || !puzzle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-[#4A5B50]">Chamber not found.</p>
        <button onClick={goToMap} className="mt-4 px-4 py-2 bg-[#1E3827] text-white rounded cursor-pointer">
          Return to Atlas
        </button>
      </div>
    );
  }

  const isSolved = progress.solvedPuzzles.includes(puzzle.id);
  const isDoorUnlocked = progress.unlockedDoors.includes(puzzle.id);
  const currentHintLevel = progress.hintsRevealed[puzzle.id] || 0;

  // -------------------------------------------------------------
  // THE 8-STEP PUZZLE & DOOR UNLOCKING ANIMATION SEQUENCE
  // -------------------------------------------------------------
  const handlePuzzleSolved = () => {
    if (sequenceStage !== 'idle') return;

    // STEP 1: Puzzle Completion
    setSequenceStage('puzzle_solved');
    solvePuzzle(puzzle.id);

    // STEP 2: Key Discovery (emerges after 600ms)
    setTimeout(() => {
      setSequenceStage('key_revealed');
      soundFx.playKeyCollect();

      // STEP 3: Key Collection (travels to inventory after 900ms)
      setTimeout(() => {
        setSequenceStage('key_collected');
        collectKey(puzzle.id);

        // STEP 4: Puzzle Panel Disappears (fades out completely after 800ms)
        setTimeout(() => {
          setSequenceStage('panel_fade_out');

          // STEP 5: Key enters lock & turns (after panel vanishes 600ms)
          setTimeout(() => {
            setSequenceStage('key_enter_lock');
            soundFx.playDoorUnlock();

            // STEP 6: Lock clicks, Door swings wide open (after 800ms)
            setTimeout(() => {
              setSequenceStage('door_opening');
              unlockDoor(puzzle.id);

              // STEP 7: Move forward through doorway (zoom after 1000ms)
              setTimeout(() => {
                setSequenceStage('doorway_zoom');

                // STEP 8: Enter next chamber or treasure room (after 900ms)
                setTimeout(() => {
                  advanceToNextChamber();
                }, 900);
              }, 1000);
            }, 800);
          }, 600);
        }, 800);
      }, 900);
    }, 600);
  };

  const handleRevealNextHint = () => {
    if (currentHintLevel === 0) {
      useHint(puzzle.id, 1);
    } else if (currentHintLevel === 1) {
      useHint(puzzle.id, 2);
    }
  };

  const isDoorOpenVisual =
    isDoorUnlocked ||
    sequenceStage === 'door_opening' ||
    sequenceStage === 'doorway_zoom';

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col justify-between max-w-7xl mx-auto px-4 py-4 md:py-6 overflow-hidden">
      {/* Top Chamber Navigation Strip */}
      <div className="z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DDD5C3]">
        <div className="flex items-center gap-3">
          <button
            onClick={goToMap}
            className="flex items-center gap-1.5 text-xs md:text-sm font-medium text-[#4A5B50] hover:text-[#1E3827] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Facility Atlas</span>
          </button>
          <span className="text-[#DDD5C3]">/</span>
          <span className="text-xs font-mono-code text-[#8F6F28]">
            {location.name}
          </span>
        </div>

        {/* 5-Chamber Step Indicator */}
        <div className="flex items-center gap-1.5 text-xs font-mono-code">
          {location.puzzles.map((p) => {
            const isPuzSolved = progress.solvedPuzzles.includes(p.id);
            const isCurrent = p.number === activeChamberNumber;
            return (
              <div
                key={p.id}
                className={`w-7 h-7 rounded flex items-center justify-center font-bold transition-all border ${
                  isCurrent
                    ? 'bg-[#1E3827] text-white border-[#1E3827]'
                    : isPuzSolved
                    ? 'bg-[#E1E8E2] text-[#43634E] border-[#94AA99]'
                    : 'bg-[#ECE5D8] text-[#8A7D69] border-[#DDD5C3]'
                }`}
                title={`Chamber ${p.number}: ${p.title}`}
              >
                {p.number}
              </div>
            );
          })}
        </div>
      </div>

      {/* CENTRAL HERO VIEWPORT: THE ILLUMINATED DOOR WITH OVERLAID TRANSLUCENT PUZZLE PANEL */}
      <div className={`relative my-auto w-full max-w-5xl mx-auto rounded-lg overflow-hidden border border-[#DDD5C3] bg-[#EFE9DC] transition-transform duration-1000 ${
        sequenceStage === 'doorway_zoom' ? 'animate-doorway-zoom' : ''
      }`}>
        {/* Background Chamber Architecture Canvas */}
        <div className="relative w-full aspect-16/10 sm:aspect-16/9 flex items-center justify-center overflow-hidden p-4 sm:p-8">
          {/* Subtle Chamber Ambient Lighting & Shadow */}
          <div className="absolute inset-0 bg-radial from-transparent via-black/5 to-black/25 pointer-events-none" />

          {/* THE DOOR (Central Focus) */}
          <div className="relative w-72 sm:w-84 md:w-96 h-[400px] sm:h-[480px] flex flex-col items-center justify-end select-none">
            {/* Monumental Stone Arch Lintel */}
            <svg viewBox="0 0 200 260" className="w-full h-full absolute inset-0" fill="none">
              {/* Outer Carved Stone Arch */}
              <path d="M15 260 V95 Q15 15 100 15 Q185 15 185 95 V260 Z" fill="#D3C7B2" stroke="#8E8069" strokeWidth="3" />
              {/* Inner Arch Step */}
              <path d="M28 260 V100 Q28 28 100 28 Q172 28 172 100 V260 Z" fill="#C5B9A3" stroke="#7A6D57" strokeWidth="2" />

              {/* Silicon Copper Bus Inscription along Arch */}
              <path d="M35 260 V115 Q35 45 100 45 Q165 45 165 115 V260" stroke="#C29B48" strokeWidth="1.5" strokeDasharray="5 3" />

              {/* Lintel Keystone */}
              <polygon points="100,10 88,35 112,35" fill="#C29B48" stroke="#8F6F28" strokeWidth="1.5" />
            </svg>

            {/* Glowing Passage Portal behind the door */}
            <div className="absolute inset-x-9 bottom-0 top-14 bg-radial from-[#F5EFE0] via-[#D4AF37]/50 to-[#233827] rounded-t-sm flex items-center justify-center overflow-hidden">
              <div className="text-center font-serif-title font-bold text-xs tracking-widest text-[#1E3827] opacity-80">
                <span>PORTAL OPEN</span>
              </div>
            </div>

            {/* Heavy Vaulted Door Leaf (Swings on hinge) */}
            <div
              className={`absolute inset-x-9 bottom-0 top-14 bg-[#5A452E] border-2 border-[#3D2C1C] rounded-t-sm shadow-2xl flex flex-col items-center justify-center transition-all ${
                isDoorOpenVisual ? 'animate-door-open' : ''
              }`}
            >
              {/* Wood Grain & Iron Stud Details */}
              <div className="absolute inset-x-3 top-3 bottom-3 border border-[#483622] pointer-events-none" />

              {/* Heavy Brass Lock Plate & Keyhole */}
              <div className="relative w-14 h-20 bg-[#C29B48] border-2 border-[#8F6F28] rounded-sm flex flex-col items-center justify-center shadow-lg">
                {isDoorUnlocked || sequenceStage === 'door_opening' ? (
                  <Unlock className="w-6 h-6 text-[#1E3827]" />
                ) : (
                  <Lock className="w-6 h-6 text-[#4F3E29]" />
                )}

                {/* Keyhole */}
                <div className="w-2 h-4 bg-[#1C140D] rounded-full mt-2" />

                {/* Animated Key entering lock (Step 5) */}
                {sequenceStage === 'key_enter_lock' && (
                  <div className="absolute inset-0 flex items-center justify-center animate-key-enter-lock">
                    <Key className="w-8 h-8 text-[#FAF8F5] filter drop-shadow(0 0 6px #C29B48)" />
                  </div>
                )}
              </div>
            </div>

            {/* Floating Discovered Key Animation (Step 2 & 3) */}
            {(sequenceStage === 'key_revealed' || sequenceStage === 'key_collected') && (
              <div className="absolute top-1/3 z-40 flex flex-col items-center animate-key-unlock pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-[#FAF8F5]/90 border-2 border-[#C29B48] flex items-center justify-center shadow-2xl">
                  <Key className="w-10 h-10 text-[#C29B48] animate-pulse" />
                </div>
                <div className="mt-2 px-2.5 py-0.5 rounded bg-[#1E3827] text-white font-mono-code font-bold text-xs shadow-md">
                  Chamber {puzzle.number} Key Discovered!
                </div>
              </div>
            )}
          </div>

          {/* OVERLAID FLOATING TRANSLUCENT PUZZLE INTERFACE (Directly Over the Door) */}
          {sequenceStage !== 'panel_fade_out' &&
           sequenceStage !== 'key_enter_lock' &&
           sequenceStage !== 'door_opening' &&
           sequenceStage !== 'doorway_zoom' &&
           !panelMinimized && (
            <div className={`absolute z-30 inset-x-3 sm:inset-x-8 md:inset-x-12 top-4 bottom-4 flex flex-col justify-between p-4 sm:p-6 rounded-lg transition-all shadow-2xl backdrop-blur-md ${
              sequenceStage === 'puzzle_solved' ? 'animate-panel-fade-out' : 'animate-panel-fade-in'
            } bg-[#FAF8F5]/90 border border-[#C29B48]/50 text-[#1E3827] overflow-y-auto`}>
              
              {/* Floating Panel Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#DDD5C3]/80">
                <div>
                  <div className="text-[11px] font-mono-code text-[#8F6F28] uppercase tracking-wider">
                    {location.name} · Chamber {puzzle.number} Door
                  </div>
                  <h2 className="font-serif-title font-bold text-base sm:text-lg text-[#1E3827]">
                    {puzzle.title}
                  </h2>
                </div>

                {/* Quick Controls on Panel */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowClueModal(true)}
                    className="px-2.5 py-1 text-xs font-medium rounded bg-[#ECE5D8] hover:bg-[#DDD5C3] text-[#1E3827] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#8F6F28]" />
                    <span className="hidden sm:inline">Inspect Clue</span>
                  </button>

                  <button
                    onClick={() => setShowHintModal(true)}
                    className="px-2.5 py-1 text-xs font-medium rounded bg-[#ECE5D8] hover:bg-[#DDD5C3] text-[#1E3827] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-[#43634E]" />
                    <span>Hints ({currentHintLevel}/2)</span>
                  </button>
                </div>
              </div>

              {/* Integrated Interactive Puzzle Mechanism */}
              <div className="my-auto py-2">
                <PuzzleRenderer
                  puzzle={puzzle}
                  isSolved={isSolved || sequenceStage !== 'idle'}
                  onSolve={handlePuzzleSolved}
                />
              </div>

              {/* Floating Panel Footer */}
              <div className="pt-2 border-t border-[#DDD5C3]/80 flex items-center justify-between text-xs text-[#6E7E73] font-mono-code">
                <span>Operate apparatus to unlock the door</span>
                {isSolved && (
                  <button
                    onClick={advanceToNextChamber}
                    className="text-[#43634E] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Proceed to Next Chamber</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Toggle Panel Button if Minimized */}
          {panelMinimized && (
            <button
              onClick={() => setPanelMinimized(false)}
              className="absolute z-30 bottom-4 right-4 px-3 py-1.5 rounded bg-[#C29B48] text-white text-xs font-semibold shadow-lg hover:bg-[#8F6F28] transition-colors cursor-pointer"
            >
              Show Puzzle Console
            </button>
          )}
        </div>
      </div>

      {/* Environmental Clue Modal */}
      {showClueModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] border border-[#DDD5C3] rounded max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#DDD5C3]">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#8F6F28]" />
                <h3 className="font-serif-title font-bold text-sm text-[#1E3827]">
                  Chamber Apparatus Clue
                </h3>
              </div>
              <button
                onClick={() => setShowClueModal(false)}
                className="text-xs text-[#6E7E73] hover:text-[#1E3827] font-mono-code cursor-pointer"
              >
                Close
              </button>
            </div>

            <p className="text-xs md:text-sm text-[#4A5B50] leading-relaxed italic bg-[#F3ECE1] p-4 rounded border border-[#E2D8C6]">
              "{puzzle.environmentalClue}"
            </p>

            <div className="text-xs text-[#6E7E73] font-mono-code">
              Tip: Consult the diagnostic instruments in your Supply Chest for exact formulas.
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowClueModal(false)}
                className="px-4 py-2 bg-[#1E3827] text-white text-xs font-semibold rounded hover:bg-[#2A4D37] cursor-pointer"
              >
                Resume Puzzle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progressive Hint Modal */}
      {showHintModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] border border-[#DDD5C3] rounded max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#DDD5C3]">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#43634E]" />
                <h3 className="font-serif-title font-bold text-sm text-[#1E3827]">
                  Progressive Hint Console
                </h3>
              </div>
              <button
                onClick={() => setShowHintModal(false)}
                className="text-xs text-[#6E7E73] hover:text-[#1E3827] font-mono-code cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              {/* Level 1 Hint */}
              <div className={`p-3 rounded border text-xs ${
                currentHintLevel >= 1
                  ? 'bg-[#F2F6F3] border-[#94AA99] text-[#1E3827]'
                  : 'bg-[#ECE5D8] border-[#DDD5C3] text-[#8A7D69]'
              }`}>
                <div className="font-bold mb-1 flex items-center justify-between">
                  <span>Level 1: Conceptual Nudge</span>
                  {currentHintLevel >= 1 && <span className="text-[10px] text-[#43634E]">Revealed (-5 pts)</span>}
                </div>
                {currentHintLevel >= 1 ? (
                  <p className="leading-relaxed">{puzzle.hints[0]}</p>
                ) : (
                  <p className="italic">Gentle nudge toward the underlying COA principle.</p>
                )}
              </div>

              {/* Level 2 Hint */}
              <div className={`p-3 rounded border text-xs ${
                currentHintLevel >= 2
                  ? 'bg-[#F2F6F3] border-[#94AA99] text-[#1E3827]'
                  : 'bg-[#ECE5D8] border-[#DDD5C3] text-[#8A7D69]'
              }`}>
                <div className="font-bold mb-1 flex items-center justify-between">
                  <span>Level 2: Procedural Clue</span>
                  {currentHintLevel >= 2 && <span className="text-[10px] text-[#43634E]">Revealed (-5 pts)</span>}
                </div>
                {currentHintLevel >= 2 ? (
                  <p className="leading-relaxed">{puzzle.hints[1]}</p>
                ) : (
                  <p className="italic">Specific procedural or calculation guidance.</p>
                )}
              </div>
            </div>

            {currentHintLevel < 2 && (
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-[#8B2626] font-mono-code">
                  Cost: 5 point deduction from score
                </span>
                <button
                  onClick={handleRevealNextHint}
                  className="px-3.5 py-1.5 bg-[#8F6F28] hover:bg-[#72571F] text-white text-xs font-semibold rounded transition-colors cursor-pointer"
                >
                  Reveal Hint {currentHintLevel + 1}
                </button>
              </div>
            )}

            <div className="pt-2 border-t border-[#DDD5C3] flex justify-end">
              <button
                onClick={() => setShowHintModal(false)}
                className="px-4 py-1.5 bg-[#1E3827] text-white text-xs font-semibold rounded cursor-pointer"
              >
                Return to Door
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
