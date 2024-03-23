export const LAYOUT_LEFT = "left";
export const LAYOUT_RIGHT = "right";
export const LAYOUT_FULL = "full";
export const LAYOUT_DEFAULT = "full";
export const FLOATING_LAYOUT_DEFAULT = "floating_layout_default";

const layoutToClassMap = {
  [LAYOUT_LEFT]: "rounded-s-lg p-2.5",
  [LAYOUT_RIGHT]: "rounded-e-lg p-2.5",
  [LAYOUT_FULL]: "rounded-lg p-2.5",
  [LAYOUT_DEFAULT]: "rounded-lg p-2.5",
  [FLOATING_LAYOUT_DEFAULT]: "rounded-0 py-2.5",
};
export const resolveLayoutClass = (layout) => {
  return layoutToClassMap[layout] || layoutToClassMap[LAYOUT_DEFAULT];
};
