const tintColorLight = '#4285F4';
const tintColorDark = '#75A7FF';

export default {
  primary: '#4285F4',
  secondary: '#34A853',
  accent: '#FBBC05',
  danger: '#EA4335',
  warning: '#FBBC05',
  success: '#34A853',
  
  white: '#FFFFFF',
  black: '#000000',
  
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  light: {
    text: '#1F2937',
    background: '#FFFFFF',
    tint: tintColorLight,
    tabIconDefault: '#6B7280',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#FFFFFF',
    background: '#121212',
    tint: tintColorDark,
    tabIconDefault: '#9CA3AF',
    tabIconSelected: tintColorDark,
  },
};