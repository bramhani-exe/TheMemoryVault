import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { INVENTORY_TOOLS } from '../data/toolsData';
import { Briefcase, X, Search, Sliders, Activity, Clock, Compass, Radio } from 'lucide-react';
import { InventoryItem } from '../types/game';

export const InventoryModal: React.FC = () => {
  const { isInventoryOpen, toggleInventory } = useGame();
  const [selectedTool, setSelectedTool] = useState<InventoryItem>(INVENTORY_TOOLS[0]);

  if (!isInventoryOpen) return null;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search': return <Search className="w-5 h-5 text-[#8F6F28]" />;
      case 'Sliders': return <Sliders className="w-5 h-5 text-[#8F6F28]" />;
      case 'Activity': return <Activity className="w-5 h-5 text-[#8F6F28]" />;
      case 'Clock': return <Clock className="w-5 h-5 text-[#8F6F28]" />;
      case 'Compass': return <Compass className="w-5 h-5 text-[#8F6F28]" />;
      case 'Radio': return <Radio className="w-5 h-5 text-[#8F6F28]" />;
      default: return <Briefcase className="w-5 h-5 text-[#8F6F28]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] border border-[#DDD5C3] rounded max-w-3xl w-full p-6 space-y-6 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#DDD5C3]">
          <div className="flex items-center gap-2.5">
            <Briefcase className="w-5 h-5 text-[#8F6F28]" />
            <div>
              <h2 className="font-serif-title font-bold text-base text-[#1E3827]">
                Architectural Supply Chest & Diagnostic Instruments
              </h2>
              <div className="text-[11px] text-[#6E7E73] font-mono-code">
                Persistent Inventory · {INVENTORY_TOOLS.length} Instruments Ready
              </div>
            </div>
          </div>

          <button
            onClick={() => toggleInventory(false)}
            aria-label="Close supply chest"
            className="p-1 text-[#6E7E73] hover:text-[#1E3827] rounded hover:bg-[#ECE5D8] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Two-Column Explorer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 overflow-y-auto pr-1">
          {/* Tools List */}
          <div className="md:col-span-5 space-y-2">
            <div className="text-xs font-semibold text-[#1E3827] uppercase tracking-wider mb-2 font-mono-code">
              Available Instruments
            </div>

            <div className="space-y-1.5">
              {INVENTORY_TOOLS.map((tool) => {
                const isSelected = selectedTool.id === tool.id;
                return (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool)}
                    className={`w-full text-left p-3 rounded border text-xs transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-[#F2F6F3] border-[#43634E] text-[#1E3827] shadow-xs'
                        : 'bg-[#F5EFE4] border-[#DDD5C3] text-[#4A5B50] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="p-1.5 rounded bg-[#EAE2D2] shrink-0 mt-0.5">
                      {renderIcon(tool.iconName)}
                    </div>
                    <div>
                      <div className="font-bold text-[#1E3827]">{tool.name}</div>
                      <div className="text-[11px] text-[#6E7E73] line-clamp-1">{tool.tagline}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tool Inspector Panel */}
          <div className="md:col-span-7 bg-[#F4EFE6] border border-[#DDD5C3] rounded p-5 space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded bg-[#E5DFC8] text-[#8F6F28]">
                  {renderIcon(selectedTool.iconName)}
                </div>
                <div>
                  <h3 className="font-serif-title font-bold text-base text-[#1E3827]">
                    {selectedTool.name}
                  </h3>
                  <div className="text-xs text-[#8F6F28] font-mono-code">
                    {selectedTool.tagline}
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#4A5B50] leading-relaxed pt-2">
                {selectedTool.description}
              </p>
            </div>

            {/* Inscribed Technical Knowledge / Clue */}
            <div className="p-4 bg-[#FAF8F5] border border-[#C5BBA7] rounded space-y-2">
              <div className="text-xs font-bold text-[#1E3827] uppercase tracking-wider font-mono-code flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-[#43634E]" />
                <span>{selectedTool.interactiveClueTitle}</span>
              </div>
              <p className="text-xs text-[#4A5B50] leading-relaxed font-mono-code bg-[#F3ECE1] p-3 rounded border border-[#E0D7C4]">
                {selectedTool.interactiveClueContent}
              </p>
            </div>

            <div className="text-[11px] text-[#6E7E73] font-mono-code">
              Instruments offer reference principles and formulas to help you reason through chamber puzzles.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#DDD5C3] flex justify-end">
          <button
            onClick={() => toggleInventory(false)}
            className="px-4 py-2 bg-[#1E3827] text-white text-xs font-semibold rounded hover:bg-[#2A4D37] transition-colors cursor-pointer"
          >
            Close Chest
          </button>
        </div>
      </div>
    </div>
  );
};
