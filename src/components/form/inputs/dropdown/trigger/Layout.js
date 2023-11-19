export const LAYOUT_LEFT = "left";
export const LAYOUT_RIGHT = "right";
export const LAYOUT_FULL = "full";
export const LAYOUT_DEFAULT = "full";

const layoutToClassMap = {
  [LAYOUT_LEFT]: "rounded-s-lg",
  [LAYOUT_RIGHT]: "rounded-e-lg",
  [LAYOUT_FULL]: "rounded-lg",
  [LAYOUT_DEFAULT]: "rounded-lg",
};
export const resolveLayoutClass = (layout) => {
  return layoutToClassMap[layout] || layoutToClassMap[LAYOUT_DEFAULT];
};
