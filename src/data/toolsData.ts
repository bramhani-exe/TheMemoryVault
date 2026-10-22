import { InventoryItem } from '../types/game';

export const INVENTORY_TOOLS: InventoryItem[] = [
  {
    id: 'hierarchy-gauge',
    name: 'Hierarchy Gauge',
    tagline: 'Pyramid analyzer for speed, cost, and capacity trade-offs',
    description: 'An engraved brass slide rule calibrated to access latencies. It illustrates why registers are fast and small, while main memory and storage provide vast, affordable capacity.',
    interactiveClueTitle: 'Hierarchy Principles',
    interactiveClueContent: 'Order from fastest access to largest capacity: CPU Registers (<1 ns) -> Cache Memory (1-10 ns) -> Main Memory DRAM (50-100 ns) -> Secondary Storage SSD (>10 µs). Cost per bit decreases down the hierarchy.',
    iconName: 'Sliders'
  },
  {
    id: 'refresh-metronome',
    name: 'DRAM Refresh Metronome',
    tagline: 'Resonance timer for dynamic capacitor charge decay',
    description: 'A pendulum instrument tuned to capacitor charge dissipation. It contrasts 6-transistor static latching (SRAM) with dynamic capacitive storage needing periodic refresh (DRAM).',
    interactiveClueTitle: 'SRAM vs DRAM Circuitry',
    interactiveClueContent: 'SRAM uses 6 transistors (6T flip-flop): fast, expensive, no refresh needed; used for Cache. DRAM uses 1 transistor + 1 capacitor (1T-1C): high density, low cost, requires periodic electrical refresh because capacitors leak charge.',
    iconName: 'Radio'
  },
  {
    id: 'cache-modulo-caliper',
    name: 'Cache Modulo Caliper',
    tagline: 'Direct-mapping line calculator and tag comparator',
    description: 'A brass gear instrument that computes line indices for direct-mapped caches: Cache Line = Memory Block mod (Total Lines), and checks the address TAG field.',
    interactiveClueTitle: 'Direct Mapping Formula',
    interactiveClueContent: 'Cache Line = (Block Address) mod (Number of Cache Lines). For a 4-line cache: Line = Block mod 4. The TAG field verifies if the block in the line matches the exact address requested by the CPU (Cache Hit vs Miss).',
    iconName: 'Search'
  },
  {
    id: 'locality-lens',
    name: 'Locality Lens',
    tagline: 'Optical magnifier for Temporal and Spatial memory access',
    description: 'A ground quartz lens that identifies program execution patterns that repeat in time (temporal) or access adjacent memory words in space (spatial).',
    interactiveClueTitle: 'Principle of Locality',
    interactiveClueContent: 'Temporal Locality: A memory location referenced now is likely to be referenced again soon (e.g., loop counter variable). Spatial Locality: Memory locations near recently referenced addresses are likely to be accessed soon (e.g., sequential array traversal).',
    iconName: 'Compass'
  }
];
