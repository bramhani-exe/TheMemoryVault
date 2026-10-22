import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { LOCATIONS } from '../data/locationsData';
import { BookOpen, X, Search, CheckCircle2 } from 'lucide-react';

export const JournalModal: React.FC = () => {
  const { isJournalOpen, toggleJournal, journalEntries } = useGame();
  const [filterLocation, setFilterLocation] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isJournalOpen) return null;

  const filteredEntries = journalEntries.filter((entry) => {
    const matchesLoc = filterLocation === 'all' || entry.locationId === filterLocation;
    const matchesQuery =
      searchQuery.trim() === '' ||
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.academicConcept.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLoc && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] border border-[#DDD5C3] rounded max-w-4xl w-full p-6 space-y-6 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#DDD5C3]">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-[#43634E]" />
            <div>
              <h2 className="font-serif-title font-bold text-base text-[#1E3827]">
                Architectural Learning Journal
              </h2>
              <div className="text-[11px] text-[#6E7E73] font-mono-code">
                {journalEntries.length} of 15 Concepts Mastered & Recorded
              </div>
            </div>
          </div>

          <button
            onClick={() => toggleJournal(false)}
            aria-label="Close learning journal"
            className="p-1 text-[#6E7E73] hover:text-[#1E3827] rounded hover:bg-[#ECE5D8] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Functional Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto p-1 bg-[#ECE5D8] rounded text-xs">
            <button
              onClick={() => setFilterLocation('all')}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap font-medium cursor-pointer ${
                filterLocation === 'all'
                  ? 'bg-white text-[#1E3827] shadow-xs'
                  : 'text-[#4A5B50] hover:text-[#1E3827]'
              }`}
            >
              All Topics ({journalEntries.length}/15)
            </button>
            {LOCATIONS.map((loc) => {
              const count = journalEntries.filter(e => e.locationId === loc.id).length;
              return (
                <button
                  key={loc.id}
                  onClick={() => setFilterLocation(loc.id)}
                  className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap font-medium cursor-pointer ${
                    filterLocation === loc.id
                      ? 'bg-white text-[#1E3827] shadow-xs'
                      : 'text-[#4A5B50] hover:text-[#1E3827]'
                  }`}
                >
                  {loc.name.split(' ')[1] || loc.name} ({count}/5)
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-56 shrink-0">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8A7D69]" />
            <input
              type="text"
              placeholder="Search concepts or formulas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#FFFDF9] border border-[#DDD5C3] rounded text-xs text-[#1E3827] placeholder:text-[#9E9178] focus:border-[#43634E] focus:outline-hidden"
            />
          </div>
        </div>

        {/* Journal Entries List */}
        <div className="space-y-4 overflow-y-auto pr-1 flex-1 min-h-[300px]">
          {filteredEntries.length === 0 ? (
            <div className="p-8 text-center text-[#8A7D69] text-xs space-y-2">
              <BookOpen className="w-8 h-8 mx-auto text-[#B5A890]" />
              <p className="font-medium text-sm text-[#4A5B50]">No journal records found.</p>
              <p>
                Solve chambers on the adventure map to unlock their verified academic records here.
              </p>
            </div>
          ) : (
            filteredEntries.map((record) => {
              const loc = LOCATIONS.find(l => l.id === record.locationId);
              return (
                <div
                  key={record.puzzleId}
                  className="p-5 bg-[#FAF8F5] border border-[#DDD5C3] rounded space-y-3 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-[#DDD5C3]/70">
                    <div>
                      <div className="text-[11px] font-mono-code text-[#8F6F28]">
                        {loc?.name} · Chamber {record.chamberNumber}
                      </div>
                      <h3 className="font-serif-title font-bold text-sm text-[#1E3827]">
                        {record.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono-code text-[#43634E]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{record.academicConcept}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#4A5B50] leading-relaxed">
                    {record.summary}
                  </p>

                  {record.formulaOrDiagram && (
                    <div className="p-3 bg-[#F3ECE1] border border-[#E2D8C6] rounded text-xs font-mono-code text-[#1E3827] overflow-x-auto">
                      <span className="font-bold text-[#8F6F28] mr-2">Formula / Invariant:</span>
                      {record.formulaOrDiagram}
                    </div>
                  )}

                  <div className="pt-2 text-xs text-[#1E3827] font-medium flex items-start gap-1.5">
                    <span className="text-[#43634E] font-bold">Key Academic Takeaway:</span>
                    <span>{record.keyTakeaway}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#DDD5C3] flex items-center justify-between text-xs text-[#6E7E73] font-mono-code">
          <span>Based on COA Module 5: Memory Organization Syllabus</span>
          <button
            onClick={() => toggleJournal(false)}
            className="px-4 py-2 bg-[#1E3827] text-white text-xs font-semibold rounded hover:bg-[#2A4D37] transition-colors cursor-pointer"
          >
            Close Journal
          </button>
        </div>
      </div>
    </div>
  );
};
