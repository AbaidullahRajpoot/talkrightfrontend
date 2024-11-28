/*
 * We recommend using the merged theme if you want to override our core theme.
 * This means you can use our core theme and override it with your own customizations.
 * Write your overrides in the userTheme object in this file.
 * The userTheme object is merged with the coreTheme object within this file.
 * Export this file and import it in the `@components/theme/index.tsx` file to use the merged theme.
 */
// MUI Imports
import { Poppins } from 'next/font/google'

import { deepmerge } from '@mui/utils';

// Core Theme Imports
import coreTheme from '@core/theme'

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const mergedTheme = (settings, mode, direction) => {
  // Vars
  const userTheme = {
    colorSchemes: {
      light: {
        palette: {
          secondary: {
            main: "#007A87",
            light: "#FF9CF2",
            dark: "#80004E",
          },
        },
      },
      dark: {
        palette: {
          secondary: {
            main: '#808390',
            light: '#999CA6',
            dark: '#737682',
            contrastText: '#FFF',
            lighterOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.08)',
            lightOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.16)',
            mainOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.24)',
            darkOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.32)',
            darkerOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.38)'
          },
        },
      },
    },
    typography: {
      fontFamily: poppins.style.fontFamily
    }

  }

  return deepmerge(coreTheme(settings, mode, direction), userTheme)
}

export default mergedTheme
