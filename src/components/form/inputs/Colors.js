export const COLOR_GRAY = "gray";
export const COLOR_FAILURE = "failure";

export const COLOR_GRAY_FLOATING = "floating_gray";

export const colorToClassMap = {
  [COLOR_GRAY]: "bg-gray-50 border border-gray-300 text-gray-900",
  [COLOR_FAILURE]: "bg-red-50 border border-red-500 text-red-900",
  [COLOR_GRAY_FLOATING]: "border-b-2 border-gray-300 text-gray-900",
};

export const resolveColorClasses = (color) => {
  return colorToClassMap[color] || colorToClassMap[COLOR_GRAY];
};
