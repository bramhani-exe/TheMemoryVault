import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { LOCATIONS } from '../data/locationsData';
import { CheckCircle2, RotateCcw, Map, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const FinalVaultChamber: React.FC = () => {
  const { progress, goToMap, restoreCentralVault, resetGame } = useGame();
  const [placedRelics, setPlacedRelics] = useState<string[]>(() => {
    return progress.vaultRestored ? LOCATIONS.map(l => l.treasure.id) : [];
  });
  const [restorationStep, setRestorationStep] = useState<boolean>(progress.vaultRestored);

  const handlePlaceRelic = (relicId: string) => {
    if (placedRelics.includes(relicId)) return;
    soundFx.playKeyCollect();
    setPlacedRelics(prev => {
      const next = [...prev, relicId];
      if (next.length === 3) {
        soundFx.playDoorUnlock();
      }
      return next;
    });
  };

  const handleExecuteRestoration = () => {
    soundFx.playSuccess();
    setRestorationStep(true);
    restoreCentralVault();
  };

  const allPlaced = placedRelics.length === 3;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
      {/* Vault Header */}
      <div className="text-center space-y-2">
        <div className="text-xs font-mono-code text-[#8F6F28] uppercase tracking-widest font-bold">
          Module 5 Grand Culmination
        </div>
        <h1 className="font-serif-title text-2xl md:text-4xl font-bold text-[#1E3827]">
          The Central Memory Vault
        </h1>
        <p className="text-sm text-[#4A5B50] max-w-xl mx-auto">
          Here lies the core architectural memory controller of the entire facility.
          Insert the three topic relics into their master bus sockets to restore system balance.
        </p>
      </div>

      {!restorationStep ? (
        <div className="bg-[#FAF8F5] border border-[#DDD5C3] rounded p-6 md:p-8 space-y-8 shadow-sm">
          {/* Relic Socket Grid (3 Sockets) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {LOCATIONS.map((loc) => {
              const relic = loc.treasure;
              const isPlaced = placedRelics.includes(relic.id);

              return (
                <div
                  key={relic.id}
                  className={`p-4 rounded border text-left flex flex-col justify-between transition-all ${
                    isPlaced
                      ? 'bg-[#F2F6F3] border-[#43634E] shadow-xs'
                      : 'bg-[#F3ECE1] border-dashed border-[#DDD5C3]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono-code text-[#6E7E73]">
                        {loc.syllabusModuleHours}
                      </span>
                      {isPlaced ? (
                        <CheckCircle2 className="w-4 h-4 text-[#43634E]" />
                      ) : (
                        <span className="text-[10px] text-[#8F6F28] font-mono-code font-bold">Awaiting Socket</span>
                      )}
                    </div>

                    <div className="font-serif-title font-bold text-sm text-[#1E3827]">
                      {relic.name}
                    </div>
                    <div className="text-xs text-[#5E6861]">
                      {relic.academicSymbol}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#DDD5C3]/60">
                    {isPlaced ? (
                      <span className="text-xs font-mono-code text-[#245431] font-semibold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Calibrated & Active</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handlePlaceRelic(relic.id)}
                        className="w-full px-3 py-1.5 bg-[#C29B48] hover:bg-[#8F6F28] text-white text-xs font-semibold rounded transition-colors shadow-xs cursor-pointer"
                      >
                        Insert Relic
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Central Restoration Action */}
          <div className="pt-4 border-t border-[#DDD5C3] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono-code text-[#4A5B50]">
              {placedRelics.length} of 3 Relics Positioned in Master Core
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={goToMap}
                className="px-4 py-2.5 text-xs text-[#4A5B50] hover:text-[#1E3827] font-medium cursor-pointer"
              >
                Return to Map
              </button>
              <button
                disabled={!allPlaced}
                onClick={handleExecuteRestoration}
                className={`px-6 py-2.5 text-xs font-semibold rounded flex items-center gap-2 transition-all ${
                  allPlaced
                    ? 'bg-[#1E3827] hover:bg-[#2A4D37] text-white shadow cursor-pointer'
                    : 'bg-[#DDD5C3] text-[#8A7D69] cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Synchronize Memory Systems</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Final Victory & Expedition Review Screen */
        <div className="bg-[#FAF8F5] border border-[#C29B48] rounded p-6 md:p-10 space-y-8 shadow-sm">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono-code text-[#8F6F28] bg-[#F4EFE6] px-3 py-1 rounded border border-[#DDD5C3] uppercase tracking-widest font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Facility Restored · Syllabus Conquered</span>
            </div>
            <h2 className="font-serif-title text-3xl md:text-4xl font-bold text-[#1E3827]">
              Mastery of Memory Organization
            </h2>
            <p className="text-sm text-[#4A5B50] max-w-xl mx-auto">
              The Central Memory Vault hums with restored coherence. Memory hierarchy tiers,
              DRAM refresh arrays, and cache direct-mapping modulo channels are fully operational.
            </p>
          </div>

          {/* Actual Gameplay Statistics (15 Puzzles, 3 Relics) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#F5EFE4] border border-[#DDD5C3] rounded text-center">
            <div>
              <div className="text-2xl font-bold font-mono-code text-[#1E3827]">
                15 / 15
              </div>
              <div className="text-xs text-[#6E7E73] font-medium mt-0.5">
                Chamber Keys Collected
              </div>
            </div>

            <div>
              <div className="text-2xl font-bold font-mono-code text-[#43634E]">
                3 / 3
              </div>
              <div className="text-xs text-[#6E7E73] font-medium mt-0.5">
                Topic Relics Recovered
              </div>
            </div>

            <div>
              <div className="text-2xl font-bold font-mono-code text-[#8F6F28]">
                {progress.score}
              </div>
              <div className="text-xs text-[#6E7E73] font-medium mt-0.5">
                Final Score Points
              </div>
            </div>

            <div>
              <div className="text-2xl font-bold font-mono-code text-[#5E6861]">
                {progress.hintsUsedCount}
              </div>
              <div className="text-xs text-[#6E7E73] font-medium mt-0.5">
                Hints Utilized
              </div>
            </div>
          </div>

          {/* Curriculum Checklist Completed */}
          <div className="space-y-3">
            <h3 className="font-serif-title text-base font-bold text-[#1E3827]">
              Curriculum Mastery Verified (Module 5)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-[#F2F6F3] border border-[#94AA99] rounded space-y-1">
                <span className="font-bold text-[#1E3827]">1. Memory Hierarchy:</span>
                <p className="text-[#4A5B50]">
                  Multi-tier speed/cost pyramid, CPU registers as fastest on-chip storage, SRAM cache bridge, and principles of temporal & spatial locality.
                </p>
              </div>

              <div className="p-3 bg-[#F2F6F3] border border-[#94AA99] rounded space-y-1">
                <span className="font-bold text-[#1E3827]">2. Main Memory (RAM):</span>
                <p className="text-[#4A5B50]">
                  DIMM modules, active CPU working storage, volatility blackout proof, 6T SRAM vs 1T-1C DRAM, and periodic capacitor refresh cycles.
                </p>
              </div>

              <div className="p-3 bg-[#F2F6F3] border border-[#94AA99] rounded space-y-1">
                <span className="font-bold text-[#1E3827]">3. Cache Memory Mapping:</span>
                <p className="text-[#4A5B50]">
                  Direct Mapping modulo formula (Block mod 4), address TAG verification, Cache Hit vs Miss recognition, and associative placement flexibility.
                </p>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[#DDD5C3] flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={goToMap}
              className="px-5 py-2.5 bg-[#1E3827] hover:bg-[#2A4D37] text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Map className="w-4 h-4" />
              <span>Explore Adventure Map</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('Reset all progress and replay the adventure from the beginning?')) {
                  resetGame();
                }
              }}
              className="px-4 py-2.5 bg-[#ECE5D8] hover:bg-[#DDD5C3] text-[#1E3827] text-xs font-semibold rounded flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Replay Adventure</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
