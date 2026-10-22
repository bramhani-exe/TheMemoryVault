import React, { useState, useEffect } from 'react';
import { ChamberPuzzle, VisualOption } from '../types/game';
import { Check, X, Power, Cpu, Layers, HardDrive, ShieldCheck, Zap, Disc, ArrowRight, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface PuzzleRendererProps {
  puzzle: ChamberPuzzle;
  isSolved: boolean;
  onSolve: () => void;
}

export const PuzzleRenderer: React.FC<PuzzleRendererProps> = ({
  puzzle,
  isSolved,
  onSolve
}) => {
  const data = puzzle.interactiveData;

  // --- State for Visual Selection ---
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  // --- State for Power Failure Lab ---
  const [isPowerOn, setIsPowerOn] = useState<boolean>(true);
  const [selectedLabDeviceId, setSelectedLabDeviceId] = useState<string | null>(null);

  // --- State for Hierarchy Tower ---
  const [towerFloorSlots, setTowerFloorSlots] = useState<Record<number, string>>({});
  const [selectedTowerCompId, setSelectedTowerCompId] = useState<string | null>(null);

  // --- State for Cache Router Machine ---
  const [selectedCacheSlot, setSelectedCacheSlot] = useState<number | null>(null);

  // --- State for Circuit Wiring / Matching ---
  const [selectedCircuitCompId, setSelectedCircuitCompId] = useState<string | null>(null);
  const [circuitAssignments, setCircuitAssignments] = useState<Record<string, string>>({});

  // --- State for Classification Sorter ---
  const [selectedSorterItemId, setSelectedSorterItemId] = useState<string | null>(null);
  const [sorterAssignments, setSorterAssignments] = useState<Record<string, string>>({});

  // --- State for Rotary Lock ---
  const [rotaryValues, setRotaryValues] = useState<Record<string, number>>({});

  // Feedback display
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Prepopulate if already solved
  useEffect(() => {
    if (isSolved) {
      if (data.visualSelectConfig) {
        const correct = data.visualSelectConfig.options.find(o => o.isCorrect);
        if (correct) setSelectedOptionId(correct.id);
      }
      if (data.hierarchyTowerConfig) {
        const correctFloors: Record<number, string> = {};
        data.hierarchyTowerConfig.floors.forEach(fl => {
          correctFloors[fl.level] = fl.acceptedComponentId;
        });
        setTowerFloorSlots(correctFloors);
      }
      if (data.cacheRouterMachineConfig) {
        setSelectedCacheSlot(data.cacheRouterMachineConfig.correctLineIndex);
      }
      if (data.powerFailureLabConfig) {
        setIsPowerOn(false);
        setSelectedLabDeviceId(data.powerFailureLabConfig.targetDeviceId);
      }
      if (data.circuitWiringConfig) {
        const correct: Record<string, string> = {};
        data.circuitWiringConfig.sockets.forEach(s => {
          correct[s.id] = s.correctComponentId;
        });
        setCircuitAssignments(correct);
      }
      if (data.classificationConfig) {
        const correct: Record<string, string> = {};
        data.classificationConfig.items.forEach(it => {
          correct[it.id] = it.correctCategoryId;
        });
        setSorterAssignments(correct);
      }
    }
  }, [isSolved, data]);

  // Reset local state when puzzle changes
  useEffect(() => {
    setSelectedOptionId(null);
    setIsPowerOn(true);
    setSelectedLabDeviceId(null);
    setTowerFloorSlots({});
    setSelectedTowerCompId(null);
    setSelectedCacheSlot(null);
    setSelectedCircuitCompId(null);
    setCircuitAssignments({});
    setSelectedSorterItemId(null);
    setSorterAssignments({});
    setFeedback(null);
  }, [puzzle.id]);

  // Icon helper
  const renderIcon = (name?: string) => {
    switch (name) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#8F6F28]" />;
      case 'Layers': return <Layers className="w-5 h-5 text-[#43634E]" />;
      case 'HardDrive': return <HardDrive className="w-5 h-5 text-[#236773]" />;
      case 'Disc': return <Disc className="w-5 h-5 text-[#8F6F28]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#43634E]" />;
      case 'Zap': return <Zap className="w-5 h-5 text-[#C29B48]" />;
      default: return <Sparkles className="w-5 h-5 text-[#C29B48]" />;
    }
  };

  // =========================================================================
  // 1. VISUAL SELECTION PUZZLE
  // =========================================================================
  if (data.visualSelectConfig) {
    const config = data.visualSelectConfig;

    const handleSelectOption = (opt: VisualOption) => {
      if (isSolved) return;
      setSelectedOptionId(opt.id);

      if (opt.isCorrect) {
        soundFx.playSuccess();
        setFeedback({
          type: 'success',
          text: opt.explanation || 'Mechanism disengaged! The golden key emerges.'
        });
        setTimeout(() => {
          onSolve();
        }, 800);
      } else {
        soundFx.playHint();
        setFeedback({
          type: 'error',
          text: opt.explanation || 'Not quite. Inspect the clue and try another option.'
        });
      }
    };

    return (
      <div className="space-y-5">
        <div className="text-center space-y-1">
          <div className="text-xs font-mono-code text-[#8F6F28] uppercase tracking-wider">
            Architectural Logic Selector
          </div>
          <h3 className="font-serif-title font-bold text-base md:text-lg text-[#1E3827]">
            {config.question}
          </h3>
        </div>

        {/* Large Visual Option Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          {config.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            const isCorrectOption = option.isCorrect;

            let cardStyles = 'bg-[#FAF8F5] border-[#DDD5C3] hover:border-[#94AA99] hover:bg-[#FFFDF9] text-[#1E3827] shadow-xs';
            if (isSelected) {
              if (isCorrectOption) {
                cardStyles = 'bg-[#EBF3ED] border-[#43634E] text-[#1E3827] ring-2 ring-[#43634E]/30';
              } else {
                cardStyles = 'bg-[#FDF4F4] border-[#B85C5C] text-[#1E3827] ring-2 ring-[#B85C5C]/20';
              }
            }

            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option)}
                className={`p-4 rounded border text-left flex items-start gap-3.5 transition-all cursor-pointer ${cardStyles}`}
              >
                <div className="p-2.5 rounded bg-[#F0EBE1] border border-[#DDD5C3] shrink-0 mt-0.5">
                  {renderIcon(option.iconName)}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="font-bold text-sm leading-snug flex items-center justify-between">
                    <span>{option.label}</span>
                    {isSelected && (
                      isCorrectOption ? (
                        <Check className="w-4 h-4 text-[#43634E] shrink-0 ml-1.5" />
                      ) : (
                        <X className="w-4 h-4 text-[#B85C5C] shrink-0 ml-1.5" />
                      )
                    )}
                  </div>
                  {option.sublabel && (
                    <div className="text-xs text-[#5E6861] leading-relaxed">
                      {option.sublabel}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className={`p-3.5 rounded text-xs leading-relaxed flex items-start gap-2 animate-fadeIn border ${
            feedback.type === 'success'
              ? 'bg-[#EBF3ED] border-[#94AA99] text-[#1E3827]'
              : 'bg-[#FDF4F4] border-[#D69E9E] text-[#7A2E2E]'
          }`}>
            {feedback.type === 'success' ? (
              <Check className="w-4 h-4 text-[#43634E] shrink-0 mt-0.5" />
            ) : (
              <X className="w-4 h-4 text-[#B85C5C] shrink-0 mt-0.5" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // 2. CACHE ROUTING MODULO MACHINE
  // =========================================================================
  if (data.cacheRouterMachineConfig) {
    const config = data.cacheRouterMachineConfig;

    const handleSelectSlot = (lineIdx: number) => {
      if (isSolved) return;
      setSelectedCacheSlot(lineIdx);

      if (lineIdx === config.correctLineIndex) {
        soundFx.playSuccess();
        setFeedback({
          type: 'success',
          text: `Routing verified! Block #${config.blockAddress} mod ${config.totalLines} = Line ${lineIdx}. The keyhole unlocks!`
        });
        setTimeout(() => {
          onSolve();
        }, 800);
      } else {
        soundFx.playHint();
        setFeedback({
          type: 'error',
          text: `Incorrect line. Calculate ${config.blockAddress} mod ${config.totalLines} (the remainder of ${config.blockAddress} ÷ ${config.totalLines}).`
        });
      }
    };

    return (
      <div className="space-y-5">
        <div className="text-center space-y-1">
          <div className="text-xs font-mono-code text-[#8F6F28] uppercase tracking-wider">
            Direct-Mapping Modulo Crossbar
          </div>
          <h3 className="font-serif-title font-bold text-base text-[#1E3827]">
            Route Memory Block #{config.blockAddress} into the Cache
          </h3>
        </div>

        {/* Prominent Formula & Incoming Block Banner */}
        <div className="p-4 bg-[#F5EFE4] border border-[#C29B48] rounded text-center space-y-2">
          <div className="text-xs font-mono-code text-[#8F6F28] font-bold">
            Routing Invariant: Cache Line = (Block Number) mod {config.totalLines}
          </div>
          <div className="inline-flex items-center gap-2 bg-[#FFFDF9] border border-[#DDD5C3] px-3.5 py-1.5 rounded text-xs font-mono-code text-[#1E3827] shadow-xs font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C29B48] animate-pulse" />
            <span>Incoming: Block #{config.blockAddress}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#8F6F28]" />
            <span className="text-[#43634E]">[ Awaiting Line Selection ]</span>
          </div>
        </div>

        {/* 4 Cache Line Compartments */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {config.lineSlots.map((slot) => {
            const isSelected = selectedCacheSlot === slot.index;
            const isCorrect = slot.index === config.correctLineIndex;

            let slotClass = 'bg-[#FAF8F5] border-[#DDD5C3] text-[#1E3827] hover:border-[#94AA99] hover:bg-[#FFFDF9]';
            if (isSelected) {
              slotClass = isCorrect
                ? 'bg-[#EBF3ED] border-[#43634E] ring-2 ring-[#43634E]/30 text-[#1E3827]'
                : 'bg-[#FDF4F4] border-[#B85C5C] ring-2 ring-[#B85C5C]/20 text-[#1E3827]';
            }

            return (
              <button
                key={slot.index}
                onClick={() => handleSelectSlot(slot.index)}
                className={`p-3.5 rounded border text-left transition-all flex items-center justify-between cursor-pointer ${slotClass}`}
              >
                <div>
                  <div className="font-mono-code font-bold text-sm text-[#1E3827]">
                    Line {slot.index}
                  </div>
                  <div className="text-[11px] text-[#5E6861] mt-0.5">
                    {slot.label}
                  </div>
                </div>

                <div className="shrink-0 p-1.5 rounded bg-[#F0EBE1] border border-[#DDD5C3] text-xs font-mono-code">
                  mod {config.totalLines} = {slot.index}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className={`p-3.5 rounded text-xs leading-relaxed flex items-start gap-2 border ${
            feedback.type === 'success'
              ? 'bg-[#EBF3ED] border-[#94AA99] text-[#1E3827]'
              : 'bg-[#FDF4F4] border-[#D69E9E] text-[#7A2E2E]'
          }`}>
            {feedback.type === 'success' ? (
              <Check className="w-4 h-4 text-[#43634E] shrink-0 mt-0.5" />
            ) : (
              <X className="w-4 h-4 text-[#B85C5C] shrink-0 mt-0.5" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // 3. POWER FAILURE EXPERIMENT LABORATORY (Knife Switch)
  // =========================================================================
  if (data.powerFailureLabConfig) {
    const config = data.powerFailureLabConfig;

    const handleTogglePower = () => {
      soundFx.playClick();
      setIsPowerOn(prev => !prev);
      setSelectedLabDeviceId(null);
      setFeedback(null);
    };

    const handleSelectDevice = (deviceId: string) => {
      if (isPowerOn) {
        soundFx.playHint();
        setFeedback({
          type: 'error',
          text: 'Pull the knife-switch to turn off power first, then observe what happens to memory data.'
        });
        return;
      }

      setSelectedLabDeviceId(deviceId);
      if (deviceId === config.targetDeviceId) {
        soundFx.playSuccess();
        setFeedback({
          type: 'success',
          text: 'Correct! Main Memory (DRAM) is volatile—its capacitive charges dissipated to 0000 0000 upon power loss.'
        });
        setTimeout(() => {
          onSolve();
        }, 800);
      } else {
        soundFx.playHint();
        setFeedback({
          type: 'error',
          text: 'That device retained its data, proving it is non-volatile! Select the device that lost its data.'
        });
      }
    };

    return (
      <div className="space-y-5">
        <div className="text-center space-y-1">
          <div className="text-xs font-mono-code text-[#8F6F28] uppercase tracking-wider">
            Memory Volatility Testing Chamber
          </div>
          <h3 className="font-serif-title font-bold text-base text-[#1E3827]">
            {config.challengeQuestion}
          </h3>
        </div>

        {/* Interactive Knife Switch Control */}
        <div className="p-4 bg-[#F5EFE4] border border-[#DDD5C3] rounded flex items-center justify-between gap-4">
          <div>
            <div className="font-bold text-xs text-[#1E3827] uppercase tracking-wider font-mono-code">
              Facility Main Power Relay
            </div>
            <div className="text-xs text-[#5E6861] mt-0.5">
              Current Status: {isPowerOn ? 'ONLINE · Powered' : 'OFFLINE · Blackout'}
            </div>
          </div>

          <button
            onClick={handleTogglePower}
            className={`px-4 py-2 rounded text-xs font-bold font-mono-code flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
              isPowerOn
                ? 'bg-[#1E3827] hover:bg-[#2A4D37] text-white'
                : 'bg-[#C29B48] hover:bg-[#8F6F28] text-white'
            }`}
          >
            <Power className="w-4 h-4" />
            <span>{isPowerOn ? 'PULL KNIFE SWITCH (OFF)' : 'RESTORE POWER (ON)'}</span>
          </button>
        </div>

        {/* Device Displays */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {config.devices.map((dev) => {
            const isSelected = selectedLabDeviceId === dev.id;
            const isTarget = dev.id === config.targetDeviceId;

            return (
              <div
                key={dev.id}
                onClick={() => handleSelectDevice(dev.id)}
                className={`p-4 rounded border transition-all cursor-pointer ${
                  isSelected
                    ? isTarget
                      ? 'bg-[#EBF3ED] border-[#43634E] ring-2 ring-[#43634E]/30'
                      : 'bg-[#FDF4F4] border-[#B85C5C]'
                    : 'bg-[#FAF8F5] border-[#DDD5C3] hover:border-[#94AA99]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-[#1E3827]">{dev.name}</span>
                  <span className="text-[11px] font-mono-code text-[#6E7E73]">{dev.typeTag}</span>
                </div>

                <div className={`p-2.5 rounded font-mono-code text-xs transition-colors ${
                  isPowerOn
                    ? 'bg-[#F0EBE1] text-[#1E3827] border border-[#DDD5C3]'
                    : dev.isVolatile
                    ? 'bg-[#FDF4F4] text-[#8B2626] border border-[#E8C2C2] font-bold'
                    : 'bg-[#EBF3ED] text-[#245431] border border-[#BBD6C4] font-bold'
                }`}>
                  {isPowerOn ? dev.prePowerData : dev.postPowerData}
                </div>

                <div className="mt-3 text-[11px] text-right font-medium text-[#8F6F28]">
                  Click to select as volatile store →
                </div>
              </div>
            );
          })}
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className={`p-3.5 rounded text-xs leading-relaxed flex items-start gap-2 border ${
            feedback.type === 'success'
              ? 'bg-[#EBF3ED] border-[#94AA99] text-[#1E3827]'
              : 'bg-[#FDF4F4] border-[#D69E9E] text-[#7A2E2E]'
          }`}>
            {feedback.type === 'success' ? (
              <Check className="w-4 h-4 text-[#43634E] shrink-0 mt-0.5" />
            ) : (
              <X className="w-4 h-4 text-[#B85C5C] shrink-0 mt-0.5" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // 4. MEMORY HIERARCHY TOWER (Pyramid Slotting)
  // =========================================================================
  if (data.hierarchyTowerConfig) {
    const config = data.hierarchyTowerConfig;

    const handleSelectComponent = (compId: string) => {
      if (isSolved) return;
      setSelectedTowerCompId(compId);
      soundFx.playClick();
    };

    const handleSlotFloor = (level: number) => {
      if (!selectedTowerCompId || isSolved) return;
      soundFx.playClick();

      const newSlots = { ...towerFloorSlots, [level]: selectedTowerCompId };
      setTowerFloorSlots(newSlots);
      setSelectedTowerCompId(null);

      // Check if all floors are slotted
      if (Object.keys(newSlots).length === config.floors.length) {
        const isAllCorrect = config.floors.every(fl => newSlots[fl.level] === fl.acceptedComponentId);
        if (isAllCorrect) {
          soundFx.playSuccess();
          setFeedback({
            type: 'success',
            text: 'All levels aligned in perfect speed and capacity hierarchy! The golden key appears.'
          });
          setTimeout(() => {
            onSolve();
          }, 800);
        } else {
          soundFx.playHint();
          setFeedback({
            type: 'error',
            text: 'One or more components are out of order. Remember: Fastest storage at Level 1, largest at Level 4.'
          });
        }
      }
    };

    return (
      <div className="space-y-5">
        <div className="text-center space-y-1">
          <div className="text-xs font-mono-code text-[#8F6F28] uppercase tracking-wider">
            Memory Hierarchy Tower
          </div>
          <h3 className="font-serif-title font-bold text-base text-[#1E3827]">
            Place Components into Correct Hierarchy Levels
          </h3>
        </div>

        {/* Available Components (Unslotted) */}
        <div className="space-y-1.5">
          <div className="text-xs font-mono-code text-[#5E6861]">
            Step 1: Select a component below, then click its matching tower floor:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {config.components.map((comp) => {
              const isSelected = selectedTowerCompId === comp.id;
              const isPlaced = Object.values(towerFloorSlots).includes(comp.id);

              return (
                <button
                  key={comp.id}
                  onClick={() => handleSelectComponent(comp.id)}
                  disabled={isPlaced}
                  className={`p-2.5 rounded border text-xs text-left transition-all cursor-pointer ${
                    isPlaced
                      ? 'bg-[#EAE2D2] border-[#DDD5C3] opacity-50 cursor-not-allowed text-[#7A6E59]'
                      : isSelected
                      ? 'bg-[#EBF3ED] border-[#43634E] ring-2 ring-[#43634E]/30 font-bold'
                      : 'bg-[#FAF8F5] border-[#DDD5C3] hover:border-[#94AA99]'
                  }`}
                >
                  <div className="font-bold text-[#1E3827] truncate">{comp.name}</div>
                  <div className="text-[10px] text-[#5E6861] mt-0.5">{comp.metric}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Tower Floors (Stepped Widths) */}
        <div className="space-y-2 pt-2">
          {config.floors.map((floor) => {
            const slottedCompId = towerFloorSlots[floor.level];
            const comp = config.components.find(c => c.id === slottedCompId);

            return (
              <div
                key={floor.level}
                onClick={() => handleSlotFloor(floor.level)}
                className={`p-3 rounded border transition-all cursor-pointer flex items-center justify-between ${
                  comp
                    ? comp.id === floor.acceptedComponentId
                      ? 'bg-[#EBF3ED] border-[#43634E] text-[#1E3827]'
                      : 'bg-[#FDF4F4] border-[#B85C5C]'
                    : 'bg-[#F5EFE4] border-dashed border-[#C5BBA7] hover:border-[#43634E]'
                }`}
              >
                <div>
                  <div className="font-mono-code text-xs font-bold text-[#1E3827]">
                    {floor.name}
                  </div>
                  <div className="text-[11px] text-[#5E6861]">
                    {floor.description}
                  </div>
                </div>

                <div className="text-xs font-mono-code font-bold px-3 py-1.5 rounded bg-[#FAF8F5] border border-[#DDD5C3]">
                  {comp ? comp.name : '[ Click to Place Selected ]'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className={`p-3.5 rounded text-xs leading-relaxed flex items-start gap-2 border ${
            feedback.type === 'success'
              ? 'bg-[#EBF3ED] border-[#94AA99] text-[#1E3827]'
              : 'bg-[#FDF4F4] border-[#D69E9E] text-[#7A2E2E]'
          }`}>
            {feedback.type === 'success' ? (
              <Check className="w-4 h-4 text-[#43634E] shrink-0 mt-0.5" />
            ) : (
              <X className="w-4 h-4 text-[#B85C5C] shrink-0 mt-0.5" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // 5. MATCHING PATCHBAY (Circuit / Role Wiring)
  // =========================================================================
  if (data.circuitWiringConfig) {
    const config = data.circuitWiringConfig;

    const handleSelectComp = (id: string) => {
      if (isSolved) return;
      setSelectedCircuitCompId(id);
      soundFx.playClick();
    };

    const handleAssignSocket = (socketId: string) => {
      if (!selectedCircuitCompId || isSolved) return;
      soundFx.playClick();

      const next = { ...circuitAssignments, [socketId]: selectedCircuitCompId };
      setCircuitAssignments(next);
      setSelectedCircuitCompId(null);

      if (Object.keys(next).length === config.sockets.length) {
        const isAllCorrect = config.sockets.every(s => next[s.id] === s.correctComponentId);
        if (isAllCorrect) {
          soundFx.playSuccess();
          setFeedback({
            type: 'success',
            text: 'All connections matched successfully! The lock disengages.'
          });
          setTimeout(() => {
            onSolve();
          }, 800);
        } else {
          soundFx.playHint();
          setFeedback({
            type: 'error',
            text: 'Some connections are mismatched. Click a component and socket to re-assign.'
          });
        }
      }
    };

    return (
      <div className="space-y-5">
        <div className="text-center space-y-1">
          <div className="text-xs font-mono-code text-[#8F6F28] uppercase tracking-wider">
            {config.title}
          </div>
          <h3 className="font-serif-title font-bold text-base text-[#1E3827]">
            Match Components with their Architectural Descriptions
          </h3>
        </div>

        {/* Left: Components to select */}
        <div className="space-y-1.5">
          <div className="text-xs font-mono-code text-[#5E6861]">
            Step 1: Select a component below:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {config.components.map((comp) => {
              const isSelected = selectedCircuitCompId === comp.id;
              const isAssigned = Object.values(circuitAssignments).includes(comp.id);

              return (
                <button
                  key={comp.id}
                  onClick={() => handleSelectComp(comp.id)}
                  className={`p-3 rounded border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#EBF3ED] border-[#43634E] ring-2 ring-[#43634E]/30 font-bold'
                      : isAssigned
                      ? 'bg-[#EAE2D2] border-[#DDD5C3] opacity-60'
                      : 'bg-[#FAF8F5] border-[#DDD5C3] hover:border-[#94AA99]'
                  }`}
                >
                  <div className="font-bold text-xs text-[#1E3827]">{comp.name}</div>
                  <div className="text-[10px] text-[#5E6861] mt-0.5">{comp.description}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Sockets to assign to */}
        <div className="space-y-2 pt-2">
          <div className="text-xs font-mono-code text-[#5E6861]">
            Step 2: Click the matching description socket:
          </div>
          {config.sockets.map((socket) => {
            const assignedCompId = circuitAssignments[socket.id];
            const comp = config.components.find(c => c.id === assignedCompId);

            return (
              <div
                key={socket.id}
                onClick={() => handleAssignSocket(socket.id)}
                className={`p-3 rounded border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                  comp
                    ? comp.id === socket.correctComponentId
                      ? 'bg-[#EBF3ED] border-[#43634E] text-[#1E3827]'
                      : 'bg-[#FDF4F4] border-[#B85C5C]'
                    : 'bg-[#F5EFE4] border-dashed border-[#C5BBA7] hover:border-[#43634E]'
                }`}
              >
                <div className="text-xs text-[#1E3827] font-medium">
                  {socket.label}
                </div>

                <div className="text-xs font-mono-code font-bold px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#DDD5C3] shrink-0 text-right">
                  {comp ? comp.name : '[ Click to Match ]'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className={`p-3.5 rounded text-xs leading-relaxed flex items-start gap-2 border ${
            feedback.type === 'success'
              ? 'bg-[#EBF3ED] border-[#94AA99] text-[#1E3827]'
              : 'bg-[#FDF4F4] border-[#D69E9E] text-[#7A2E2E]'
          }`}>
            {feedback.type === 'success' ? (
              <Check className="w-4 h-4 text-[#43634E] shrink-0 mt-0.5" />
            ) : (
              <X className="w-4 h-4 text-[#B85C5C] shrink-0 mt-0.5" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // 6. CLASSIFICATION / LOCALITY SORTER
  // =========================================================================
  if (data.classificationConfig) {
    const config = data.classificationConfig;

    const handleSelectItem = (id: string) => {
      if (isSolved) return;
      setSelectedSorterItemId(id);
      soundFx.playClick();
    };

    const handleAssignCategory = (catId: string) => {
      if (!selectedSorterItemId || isSolved) return;
      soundFx.playClick();

      const next = { ...sorterAssignments, [selectedSorterItemId]: catId };
      setSorterAssignments(next);
      setSelectedSorterItemId(null);

      if (Object.keys(next).length === config.items.length) {
        const isAllCorrect = config.items.every(it => next[it.id] === it.correctCategoryId);
        if (isAllCorrect) {
          soundFx.playSuccess();
          setFeedback({
            type: 'success',
            text: 'All patterns sorted into their correct locality principle! Access key revealed.'
          });
          setTimeout(() => {
            onSolve();
          }, 800);
        } else {
          soundFx.playHint();
          setFeedback({
            type: 'error',
            text: 'One or more items are sorted into the wrong bin. Remember: Same variable in loop = Temporal; sequential array = Spatial.'
          });
        }
      }
    };

    return (
      <div className="space-y-5">
        <div className="text-center space-y-1">
          <div className="text-xs font-mono-code text-[#8F6F28] uppercase tracking-wider">
            Principle of Locality Sorter
          </div>
          <h3 className="font-serif-title font-bold text-base text-[#1E3827]">
            Sort Access Patterns into Temporal vs. Spatial Locality
          </h3>
        </div>

        {/* Items to sort */}
        <div className="space-y-1.5">
          <div className="text-xs font-mono-code text-[#5E6861]">
            Step 1: Select an access pattern item below:
          </div>
          <div className="space-y-2">
            {config.items.map((item) => {
              const isSelected = selectedSorterItemId === item.id;
              const assignedCat = sorterAssignments[item.id];
              const cat = config.categories.find(c => c.id === assignedCat);

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectItem(item.id)}
                  className={`w-full p-3 rounded border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#EBF3ED] border-[#43634E] ring-2 ring-[#43634E]/30 font-bold'
                      : assignedCat
                      ? 'bg-[#F2ECE1] border-[#DDD5C3]'
                      : 'bg-[#FAF8F5] border-[#DDD5C3] hover:border-[#94AA99]'
                  }`}
                >
                  <span className="font-medium text-[#1E3827]">{item.name}</span>
                  <span className="font-mono-code text-[11px] font-bold text-[#8F6F28]">
                    {cat ? `[ Placed in: ${cat.title} ]` : '[ Unsorted ]'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2 Category Bins */}
        <div className="space-y-1.5 pt-1">
          <div className="text-xs font-mono-code text-[#5E6861]">
            Step 2: Click the target category bin to place the selected item:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {config.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleAssignCategory(cat.id)}
                className="p-4 rounded border border-[#C29B48] bg-[#F5EFE4] hover:bg-[#FAF8F5] text-left transition-all cursor-pointer shadow-xs"
              >
                <div className="font-serif-title font-bold text-sm text-[#1E3827]">
                  {cat.title}
                </div>
                <div className="text-xs text-[#5E6861] mt-1 leading-relaxed">
                  {cat.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className={`p-3.5 rounded text-xs leading-relaxed flex items-start gap-2 border ${
            feedback.type === 'success'
              ? 'bg-[#EBF3ED] border-[#94AA99] text-[#1E3827]'
              : 'bg-[#FDF4F4] border-[#D69E9E] text-[#7A2E2E]'
          }`}>
            {feedback.type === 'success' ? (
              <Check className="w-4 h-4 text-[#43634E] shrink-0 mt-0.5" />
            ) : (
              <X className="w-4 h-4 text-[#B85C5C] shrink-0 mt-0.5" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}
      </div>
    );
  }

  // Fallback
  return (
    <div className="p-6 text-center text-xs text-[#5E6861]">
      <p>Interactive mechanism ready.</p>
      <button
        onClick={onSolve}
        className="mt-3 px-4 py-2 bg-[#1E3827] text-white rounded cursor-pointer"
      >
        Disengage Lock
      </button>
    </div>
  );
};
