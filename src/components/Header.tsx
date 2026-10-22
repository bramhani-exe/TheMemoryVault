import React from 'react';
import { useGame } from '../context/GameContext';
import { Key, BookOpen, Briefcase, Volume2, VolumeX, RotateCcw } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    progress,
    currentScreen,
    goToMap,
    toggleInventory,
    toggleJournal,
    toggleSound,
    resetGame,
    setScreen
  } = useGame();

  const [confirmReset, setConfirmReset] = React.useState(false);

  const totalKeys = progress.collectedKeys.length;
  const totalLocations = progress.completedLocations.length;

  return (
    <header className="sticky top-0 z-40 bg-[#F5F2EA]/95 backdrop-blur-md border-b border-[#DDD5C3] px-4 md:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        {/* Wordmark */}
        <button
          onClick={goToMap}
          className="text-left font-serif-title text-lg md:text-xl font-bold tracking-wider text-[#1E3827] hover:text-[#43634E] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <span>THE MEMORY VAULT</span>
        </button>

        {/* Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#4A5B50]">
          <button
            onClick={goToMap}
            className={`hover:text-[#1E3827] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentScreen === 'map' ? 'text-[#1E3827] font-semibold underline decoration-[#C29B48] underline-offset-8' : ''
            }`}
          >
            Adventure Map
          </button>

          <button
            onClick={() => toggleInventory(true)}
            className="hover:text-[#1E3827] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Briefcase className="w-4 h-4 text-[#8F6F28]" />
            <span>Supply Chest</span>
          </button>

          <button
            onClick={() => toggleJournal(true)}
            className="hover:text-[#1E3827] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#43634E]" />
            <span>Learning Journal ({progress.solvedPuzzles.length}/15)</span>
          </button>

          <button
            onClick={() => setScreen('privacy')}
            className="text-xs text-[#6E7E73] hover:text-[#1E3827] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Privacy
          </button>

          <button
            onClick={() => setScreen('terms')}
            className="text-xs text-[#6E7E73] hover:text-[#1E3827] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Terms
          </button>
        </nav>

        {/* Primary Stats & Controls */}
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          {/* Key Tally */}
          <div className="flex items-center gap-2 text-xs md:text-sm font-mono-code text-[#4A5B50] bg-[#ECE5D8] px-3 py-1.5 rounded border border-[#D5CCBA]">
            <span className="flex items-center gap-1 text-[#8F6F28] font-bold">
              <Key className="w-3.5 h-3.5" />
              <span>{totalKeys}/15 Keys</span>
            </span>
            <span className="text-[#A29A88]" aria-hidden="true">·</span>
            <span className="text-[#1E3827] font-semibold">{progress.score} pts</span>
            <span className="hidden lg:inline text-[#A29A88]" aria-hidden="true">·</span>
            <span className="hidden lg:inline text-[#4A5B50]">{totalLocations}/3 Topics</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={progress.soundEnabled ? 'Mute audio' : 'Unmute audio'}
            className="p-1.5 text-[#4A5B50] hover:text-[#1E3827] bg-[#ECE5D8] hover:bg-[#E2D9C8] border border-[#D5CCBA] rounded transition-colors cursor-pointer"
          >
            {progress.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#43634E]" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#8A958D]" />
            )}
          </button>

          {/* Replay / Reset Dialog */}
          <div className="relative">
            <button
              onClick={() => setConfirmReset(!confirmReset)}
              title="Reset Adventure"
              className="p-1.5 text-[#4A5B50] hover:text-[#8B2626] bg-[#ECE5D8] hover:bg-[#E2D9C8] border border-[#D5CCBA] rounded transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {confirmReset && (
              <div className="absolute right-0 mt-2 w-64 bg-[#FDFBF7] p-3 shadow-xl border border-[#DDD5C3] rounded z-50 text-xs">
                <p className="font-semibold text-[#1E3827] mb-1">Reset all adventure progress?</p>
                <p className="text-[#6E7E73] mb-3">All 15 keys, scores, and unlocked chambers will be cleared.</p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setConfirmReset(false)}
                    className="px-2.5 py-1 text-[#4A5B50] hover:bg-[#ECE6D8] rounded cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setConfirmReset(false);
                      resetGame();
                    }}
                    className="px-2.5 py-1 bg-[#8B2626] text-white rounded hover:bg-[#721F1F] cursor-pointer"
                  >
                    Confirm Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sub-Nav Row */}
      <div className="md:hidden flex items-center justify-around pt-2 mt-2 border-t border-[#E5DFC8] text-xs font-medium text-[#4A5B50]">
        <button onClick={goToMap} className="hover:text-[#1E3827] py-1">
          Map
        </button>
        <span className="text-[#D5CCBA]">·</span>
        <button onClick={() => toggleInventory(true)} className="hover:text-[#1E3827] py-1 flex items-center gap-1">
          <Briefcase className="w-3.5 h-3.5 text-[#8F6F28]" />
          <span>Chest</span>
        </button>
        <span className="text-[#D5CCBA]">·</span>
        <button onClick={() => toggleJournal(true)} className="hover:text-[#1E3827] py-1 flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5 text-[#43634E]" />
          <span>Journal</span>
        </button>
      </div>
    </header>
  );
};
