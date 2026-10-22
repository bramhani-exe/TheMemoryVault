import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { LOCATIONS } from '../data/locationsData';
import { Key, Lock, CheckCircle2, Award, Sparkles, ChevronRight, Briefcase, BookOpen } from 'lucide-react';
import { LocationId } from '../types/game';

export const WorldMap: React.FC = () => {
  const { progress, enterChamber, selectLocation, setScreen, toggleInventory, toggleJournal } = useGame();
  const [hoveredNode, setHoveredNode] = useState<{
    locId: LocationId;
    chamberNum: number;
    globalNum: number;
    title: string;
    concept: string;
    isSolved: boolean;
  } | null>(null);

  const totalPuzzles = 15;
  const totalKeys = progress.collectedKeys.length;
  const completionPercentage = Math.round((totalKeys / totalPuzzles) * 100);
  const allCompleted = progress.completedLocations.length === 3;

  // 15 Level Nodes Definitions along the connected route
  // Hierarchy (Global 1-5), Main Memory (Global 6-10), Cache Mapping (Global 11-15)
  const landmarksConfig = [
    {
      id: 'hierarchy' as LocationId,
      name: 'The Memory Spire',
      subtitle: 'Memory Hierarchy',
      startGlobalNum: 1,
      color: '#43634E',
      badge: 'Topic 1',
      description: 'Layered memory tower from CPU registers to bulk storage'
    },
    {
      id: 'main-memory' as LocationId,
      name: 'The Primary Core',
      subtitle: 'Main Memory (RAM)',
      startGlobalNum: 6,
      color: '#C29B48',
      badge: 'Topic 2',
      description: 'Cleanroom research lab with DRAM capacitor arrays'
    },
    {
      id: 'cache-mapping' as LocationId,
      name: 'The Cache Citadel',
      subtitle: 'Cache Memory Mapping',
      startGlobalNum: 11,
      color: '#236773',
      badge: 'Topic 3',
      description: 'Modulo routing machine and tag comparator conduits'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-6">
      {/* Presentation Headline & Overall Progress Bar */}
      <div className="bg-[#FAF8F5] border border-[#DDD5C3] rounded p-5 md:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono-code text-[#8F6F28] uppercase tracking-wider font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Adventure World Map</span>
          </div>
          <h1 className="font-serif-title text-xl md:text-2xl font-bold text-[#1E3827]">
            Explore the memory world. Solve 15 puzzles. Collect the keys.
          </h1>
          <p className="text-xs md:text-sm text-[#4A5B50]">
            Click any numbered level node along the path to enter its locked chamber and solve its visual puzzle.
          </p>
        </div>

        {/* Global Progress Tally */}
        <div className="bg-[#F3ECE1] border border-[#DDD5C3] p-4 rounded min-w-[280px] shrink-0 shadow-inner space-y-2">
          <div className="flex items-center justify-between text-xs font-mono-code">
            <span className="font-bold text-[#1E3827] flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-[#8F6F28]" />
              <span>Keys Collected</span>
            </span>
            <span className="text-[#8F6F28] font-bold">{totalKeys} / {totalPuzzles} ({completionPercentage}%)</span>
          </div>

          <div className="w-full bg-[#DDD5C3] h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#C29B48] h-full transition-all duration-500 rounded-full"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#6E7E73] font-mono-code pt-0.5">
            <span>{progress.completedLocations.length} / 3 Relics Claimed</span>
            <span className="font-semibold text-[#1E3827]">{progress.score} Points</span>
          </div>
        </div>
      </div>

      {/* Hover Info Tooltip Bar */}
      <div className="min-h-[44px] bg-[#F5EFE4] border border-[#DDD5C3] rounded px-4 py-2 flex items-center justify-between text-xs transition-all">
        {hoveredNode ? (
          <div className="flex items-center gap-2 text-[#1E3827]">
            <span className="font-mono-code font-bold text-[#8F6F28] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#DDD5C3]">
              Level {hoveredNode.globalNum} · Chamber {hoveredNode.chamberNum}
            </span>
            <span className="font-bold">{hoveredNode.title}</span>
            <span className="text-[#5E6861] hidden sm:inline">({hoveredNode.concept})</span>
            {hoveredNode.isSolved && (
              <span className="text-[#245431] font-semibold text-[11px] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#43634E]" />
                Key Collected
              </span>
            )}
          </div>
        ) : (
          <div className="text-[#6E7E73] font-mono-code text-[11px] flex items-center gap-2">
            <span>Hover or click any level node (1–15) on the winding path below to explore its puzzle.</span>
          </div>
        )}

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => toggleInventory(true)}
            className="text-[11px] text-[#8F6F28] hover:text-[#1E3827] font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Chest</span>
          </button>
          <span className="text-[#DDD5C3]">|</span>
          <button
            onClick={() => toggleJournal(true)}
            className="text-[11px] text-[#43634E] hover:text-[#1E3827] font-semibold flex items-center gap-1 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Journal</span>
          </button>
        </div>
      </div>

      {/* THE ILLUSTRATED ADVENTURE MAP (Connected Winding Path with 3 Landmarks & 15 Nodes) */}
      <div className="bg-[#FAF8F5] border border-[#DDD5C3] rounded p-6 md:p-8 relative overflow-hidden shadow-sm">
        {/* Soft Background Landscape Decoration */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          {/* Subtle topographical and circuit contours */}
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E8DFC8" strokeWidth="0.5" strokeDasharray="3 3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridPattern)" />
          </svg>
        </div>

        {/* 3 Landmark Zones connected along the route */}
        <div className="space-y-12 relative z-10">
          {landmarksConfig.map((landmark, lIdx) => {
            const locData = LOCATIONS.find(l => l.id === landmark.id);
            if (!locData) return null;

            const isLocationComplete = progress.completedLocations.includes(landmark.id);
            const locSolvedKeys = locData.puzzles.filter(p => progress.collectedKeys.includes(p.id)).length;

            return (
              <div key={landmark.id} className="relative">
                {/* Connecting Trail Line between landmarks */}
                {lIdx > 0 && (
                  <div className="absolute -top-12 left-8 md:left-24 w-1 h-12 bg-repeating-linear-dots border-l-2 border-dashed border-[#C29B48]" />
                )}

                {/* Landmark Card & Connected 5 Levels */}
                <div className={`p-5 md:p-6 rounded border transition-all ${
                  isLocationComplete
                    ? 'bg-[#F2F6F3] border-[#94AA99]'
                    : 'bg-[#FFFDF9] border-[#DDD5C3] shadow-xs'
                }`}>
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    {/* Landmark Architectural Profile */}
                    <div className="flex items-start gap-4">
                      {/* Illustrated Landmark Icon Building */}
                      <div
                        onClick={() => selectLocation(landmark.id)}
                        className={`w-20 h-20 md:w-24 md:h-24 rounded border p-2 shrink-0 flex items-center justify-center transition-all cursor-pointer group shadow-xs ${
                          isLocationComplete
                            ? 'bg-[#EBF3ED] border-[#43634E]'
                            : 'bg-[#F5EFE4] border-[#DDD5C3] hover:border-[#C29B48]'
                        }`}
                        title="Click to view topic overview"
                      >
                        {landmark.id === 'hierarchy' && (
                          <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
                            {/* Memory Hierarchy Spire */}
                            <polygon points="40,8 18,32 62,32" fill="#C29B48" stroke="#8F6F28" strokeWidth="1.5" />
                            <rect x="22" y="32" width="36" height="14" fill="#A2B9A8" stroke="#43634E" strokeWidth="1.5" />
                            <rect x="14" y="46" width="52" height="14" fill="#88A08C" stroke="#43634E" strokeWidth="1.5" />
                            <rect x="6" y="60" width="68" height="14" fill="#6B8570" stroke="#1E3827" strokeWidth="1.5" />
                            <circle cx="40" cy="18" r="3" fill="#FFF" />
                          </svg>
                        )}

                        {landmark.id === 'main-memory' && (
                          <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
                            {/* Main Memory RAM Chip Laboratory */}
                            <rect x="15" y="15" width="50" height="50" rx="3" fill="#E2D8C6" stroke="#8E8069" strokeWidth="2" />
                            <rect x="25" y="25" width="30" height="30" fill="#1E3827" stroke="#43634E" strokeWidth="1.5" />
                            <line x1="30" y1="25" x2="30" y2="55" stroke="#C29B48" strokeWidth="1" />
                            <line x1="40" y1="25" x2="40" y2="55" stroke="#C29B48" strokeWidth="1" />
                            <line x1="50" y1="25" x2="50" y2="55" stroke="#C29B48" strokeWidth="1" />
                            {/* Gold pins */}
                            <rect x="8" y="28" width="7" height="4" fill="#C29B48" />
                            <rect x="8" y="38" width="7" height="4" fill="#C29B48" />
                            <rect x="8" y="48" width="7" height="4" fill="#C29B48" />
                            <rect x="65" y="28" width="7" height="4" fill="#C29B48" />
                            <rect x="65" y="38" width="7" height="4" fill="#C29B48" />
                            <rect x="65" y="48" width="7" height="4" fill="#C29B48" />
                          </svg>
                        )}

                        {landmark.id === 'cache-mapping' && (
                          <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
                            {/* Cache Citadel Modulo Machine */}
                            <rect x="10" y="16" width="60" height="48" rx="4" fill="#D6CDC0" stroke="#887B67" strokeWidth="2" />
                            <path d="M20 26 H60 V38 H30 V50 H55" stroke="#236773" strokeWidth="2.5" fill="none" />
                            <circle cx="20" cy="26" r="3.5" fill="#C29B48" />
                            <circle cx="55" cy="50" r="3.5" fill="#1E3827" />
                            <rect x="36" y="32" width="22" height="10" fill="#C29B48" rx="1.5" />
                            <text x="47" y="40" fill="#FFF" fontSize="6" textAnchor="middle" fontFamily="monospace">mod 4</text>
                          </svg>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-[#8F6F28] bg-[#F4EFE6] px-2 py-0.5 rounded border border-[#DDD5C3]">
                            {landmark.badge}
                          </span>
                          <span className="text-xs font-mono-code text-[#6E7E73]">
                            {locSolvedKeys} / 5 Keys Recovered
                          </span>
                        </div>

                        <h2
                          onClick={() => selectLocation(landmark.id)}
                          className="font-serif-title text-lg md:text-xl font-bold text-[#1E3827] hover:text-[#43634E] cursor-pointer transition-colors"
                        >
                          {landmark.name}
                        </h2>
                        <div className="text-xs font-semibold text-[#8F6F28]">
                          {landmark.subtitle}
                        </div>
                        <p className="text-xs text-[#5E6861] max-w-md leading-relaxed hidden sm:block">
                          {landmark.description}
                        </p>
                      </div>
                    </div>

                    {/* 5 Connected Level Stepping Stone Nodes */}
                    <div className="w-full lg:w-auto">
                      <div className="flex items-center justify-between lg:justify-end gap-2.5 sm:gap-3 flex-wrap">
                        {locData.puzzles.map((puzzle) => {
                          const globalNum = landmark.startGlobalNum + puzzle.number - 1;
                          const isSolved = progress.solvedPuzzles.includes(puzzle.id);
                          const hasKey = progress.collectedKeys.includes(puzzle.id);
                          const isNextUp = !isSolved && (puzzle.number === 1 || progress.solvedPuzzles.includes(locData.puzzles[puzzle.number - 2]?.id));

                          return (
                            <div key={puzzle.id} className="flex items-center">
                              {/* Step trail connector */}
                              {puzzle.number > 1 && (
                                <div className={`hidden sm:block w-3 md:w-5 h-0.5 ${
                                  isSolved ? 'bg-[#43634E]' : 'bg-[#DDD5C3]'
                                }`} />
                              )}

                              {/* Interactive Circular Level Node */}
                              <button
                                onClick={() => enterChamber(puzzle.number, landmark.id)}
                                onMouseEnter={() => setHoveredNode({
                                  locId: landmark.id,
                                  chamberNum: puzzle.number,
                                  globalNum,
                                  title: puzzle.title,
                                  concept: puzzle.academicConcept,
                                  isSolved
                                })}
                                onMouseLeave={() => setHoveredNode(null)}
                                className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex flex-col items-center justify-center transition-all duration-200 cursor-pointer relative shadow-sm group ${
                                  hasKey
                                    ? 'bg-[#2E6342] text-white ring-2 ring-[#43634E]/30 hover:bg-[#245235] hover:scale-110'
                                    : isNextUp
                                    ? 'bg-[#C29B48] text-white ring-4 ring-[#C29B48]/30 animate-pulse hover:bg-[#8F6F28] hover:scale-110'
                                    : 'bg-[#FFFDF9] text-[#1E3827] border-2 border-[#DDD5C3] hover:border-[#94AA99] hover:scale-105'
                                }`}
                                aria-label={`Level ${globalNum}: ${puzzle.title}`}
                              >
                                {hasKey ? (
                                  <Key className="w-4 h-4 text-[#F5D378]" />
                                ) : (
                                  <span className="font-bold font-mono-code text-xs md:text-sm">
                                    {globalNum}
                                  </span>
                                )}

                                <span className="text-[9px] font-mono-code opacity-80 leading-none">
                                  {hasKey ? '✓' : `C${puzzle.number}`}
                                </span>
                              </button>
                            </div>
                          );
                        })}

                        {/* Topic Relic / Treasure Icon at the end of the 5 levels */}
                        <div className="flex items-center ml-1">
                          <div className="hidden sm:block w-3 md:w-4 h-0.5 bg-[#DDD5C3]" />
                          <button
                            onClick={() => {
                              selectLocation(landmark.id);
                              if (isLocationComplete) setScreen('treasure');
                            }}
                            className={`w-11 h-11 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                              isLocationComplete
                                ? 'bg-[#C29B48] text-white border-[#8F6F28] shadow-md hover:scale-110'
                                : 'bg-[#EAE2D2] text-[#8A7D69] border-[#DDD5C3]'
                            }`}
                            title={isLocationComplete ? `${locData.treasure.name} Claimed!` : `Awaits discovery in Level ${landmark.startGlobalNum + 4}`}
                          >
                            <Award className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CULMINATION GATEWAY: THE CENTRAL MEMORY VAULT */}
        <div className="mt-10 pt-8 border-t border-[#DDD5C3] relative">
          <div className={`p-6 rounded border transition-all ${
            allCompleted
              ? 'bg-[#F9F7EE] border-[#C29B48] shadow-md'
              : 'bg-[#ECE6D8] border-[#DDD5C3] opacity-90'
          }`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 border-2 ${
                  allCompleted
                    ? 'bg-[#C29B48] text-white border-[#8F6F28] animate-pulse-glow shadow-md'
                    : 'bg-[#DDD5C3] text-[#7E725F] border-[#C8BEAC]'
                }`}>
                  {allCompleted ? <Sparkles className="w-7 h-7" /> : <Lock className="w-7 h-7" />}
                </div>

                <div>
                  <div className="text-xs font-mono-code uppercase tracking-wider text-[#8F6F28] font-bold">
                    Culmination Chamber
                  </div>
                  <h3 className="font-serif-title text-xl font-bold text-[#1E3827]">
                    The Central Memory Vault
                  </h3>
                  <p className="text-xs text-[#5E6861] mt-0.5">
                    {allCompleted
                      ? 'All 3 topic relics recovered (Hierarchy Pyramid, RAM Core, Cache Crossbar)! Enter to synchronize the Central Vault.'
                      : `Requires all 3 topic relics from the map (${progress.completedLocations.length} / 3 claimed).`}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (allCompleted) {
                    setScreen('final-vault');
                  }
                }}
                disabled={!allCompleted}
                className={`px-6 py-3 font-semibold text-xs rounded transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                  allCompleted
                    ? 'bg-[#1E3827] hover:bg-[#2A4D37] text-white shadow cursor-pointer'
                    : 'bg-[#DDD5C3] text-[#8A7D69] cursor-not-allowed'
                }`}
              >
                <span>{allCompleted ? 'Unlock Central Vault' : 'Vault Sealed (3 Relics Needed)'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-[#DDD5C3] flex flex-wrap items-center justify-between gap-4 text-xs font-mono-code text-[#6E7E73]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#2E6342] text-white flex items-center justify-center text-[8px]">✓</span>
              <span>Completed Level</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#C29B48]" />
              <span>Next Playable Level</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FFFDF9] border border-[#DDD5C3]" />
              <span>Available Level</span>
            </span>
          </div>

          <div>
            <span>15 Puzzles · 3 Topic Relics · 1 Grand Culmination</span>
          </div>
        </div>
      </div>
    </div>
  );
};
