import { defineThemes } from '../theme/theme.models';

export const { useTheme } = defineThemes({
  dark: {
    backgroundColor: 'rgba(35,35,35,0.7)',
    borderColor: '#282828',
  },
  light: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderColor: '#efeff5',
  },
});
