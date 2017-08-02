export interface WcaEvent {
  id: string;
  name: string;
  icon: string;
}

export const wcaEvents: WcaEvent[] = [
  { id: '333',    name: 'Rubik\'s Cube',      icon: 'event-333'   },
  { id: '222',    name: '2x2x2 Cube',         icon: 'event-222'   },
  { id: '444',    name: '4x4x4 Cube',         icon: 'event-444'   },
  { id: '555',    name: '5x5x5 Cube',         icon: 'event-555'   },
  { id: '666',    name: '6x6x6 Cube',         icon: 'event-666'   },
  { id: '777',    name: '7x7x7 Cube',         icon: 'event-777'   },
  { id: '333bf',  name: '3x3x3 Blindfolded',  icon: 'event-333bf' },
  { id: '333oh',  name: '3x3x3 One-Handed',   icon: 'event-333oh' },
  { id: '333ft',  name: '3x3x3 With Feet',    icon: 'event-333ft' },
  { id: 'minx',   name: 'Megaminx',           icon: 'event-minx'  },
  { id: 'pyram',  name: 'Pyraminx',           icon: 'event-pyram' },
  { id: 'clock',  name: 'Rubik\'s Clock',     icon: 'event-clock' },
  { id: 'skewb',  name: 'Skewb',              icon: 'event-skewb' },
  { id: 'sq1',    name: 'Square-1',           icon: 'event-sq1'   },
  { id: '444bf',  name: '4x4x4 Blindfolded',  icon: 'event-444bf' },
  { id: '555bf',  name: '5x5x5 Blindfolded',  icon: 'event-555bf' }
];