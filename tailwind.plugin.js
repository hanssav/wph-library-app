import plugin from 'tailwindcss/plugin';

const textSizes = {
  'display-3xl': '--text-display-3xl',
  'display-2xl': '--text-display-2xl',
  'display-xl': '--text-display-xl',
  'display-lg': '--text-display-lg',
  'display-md': '--text-display-md',
  'display-sm': '--text-display-sm',
  'display-xs': '--text-display-xs',
  xl: '--text-xl',
  lg: '--text-lg',
  md: '--text-md',
  sm: '--text-sm',
  xs: '--text-xs',
};

const fontWeights = {
  regular: '--font-weight-regular',
  medium: '--font-weight-medium',
  semibold: '--font-weight-semibold',
  bold: '--font-weight-bold',
  extrabold: '--font-weight-extrabold',
};

export default plugin(({ addUtilities }) => {
  const newUtilities = {};

  for (const [sizeName, sizeVar] of Object.entries(textSizes)) {
    for (const [weightName, weightVar] of Object.entries(fontWeights)) {
      // Tambahkan prefix "text-" di sini
      const className = `.text-${sizeName}-${weightName}`;
      newUtilities[className] = {
        fontSize: `var(${sizeVar})`,
        lineHeight: `var(${sizeVar}--line-height)`,
        fontWeight: `var(${weightVar})`,
        letterSpacing: `var(${sizeVar}--letter-spacing, normal)`,
      };
    }
  }

  addUtilities(newUtilities);
});
