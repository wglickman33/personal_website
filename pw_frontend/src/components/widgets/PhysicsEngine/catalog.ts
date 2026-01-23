export type DroppableShape = 'box' | 'sphere';
export type DroppableMaterial = 'normal' | 'bouncy';

export type DroppableId =
  | 'basic_box'
  | 'basic_ball'
  | 'heavy_box'
  | 'heavy_ball'
  | 'bouncy_ball'
  | 'brick'
  | 'tiny_ball'
  | 'big_box';

export type DroppableDef = {
  id: DroppableId;
  name: string;
  shape: DroppableShape;
  material: DroppableMaterial;
  price: number;
  defaultSize?: [number, number, number];
  defaultRadius?: number;
  defaultMass: number;
};

export const DROPPABLES: DroppableDef[] = [
  { id: 'basic_box', name: 'Basic Box', shape: 'box', material: 'normal', price: 0, defaultSize: [0.7, 0.7, 0.7], defaultMass: 1 },
  { id: 'basic_ball', name: 'Basic Ball', shape: 'sphere', material: 'normal', price: 0, defaultRadius: 0.45, defaultMass: 1 },

  { id: 'brick', name: 'Brick', shape: 'box', material: 'normal', price: 40, defaultSize: [1.4, 0.45, 0.7], defaultMass: 2 },
  { id: 'big_box', name: 'Big Box', shape: 'box', material: 'normal', price: 60, defaultSize: [1.2, 1.2, 0.7], defaultMass: 2.2 },
  { id: 'heavy_box', name: 'Heavy Box', shape: 'box', material: 'normal', price: 75, defaultSize: [0.9, 0.9, 0.7], defaultMass: 5 },
  { id: 'tiny_ball', name: 'Tiny Ball', shape: 'sphere', material: 'normal', price: 55, defaultRadius: 0.25, defaultMass: 0.5 },
  { id: 'heavy_ball', name: 'Heavy Ball', shape: 'sphere', material: 'normal', price: 90, defaultRadius: 0.55, defaultMass: 6 },

  { id: 'bouncy_ball', name: 'Bouncy Ball', shape: 'sphere', material: 'bouncy', price: 120, defaultRadius: 0.5, defaultMass: 1.2 },
];

export const DEFAULT_UNLOCKED: Record<DroppableId, boolean> = {
  basic_box: true,
  basic_ball: true,
  heavy_box: false,
  heavy_ball: false,
  bouncy_ball: false,
  brick: false,
  tiny_ball: false,
  big_box: false,
};

