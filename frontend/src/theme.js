import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4a3728', // Το σκούρο καφέ του Woodlab
      light: '#a67c52', // Το χρώμα του ξύλου
      dark: '#2c1e14',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f0e6dd', // Το κρέμ/μπεζ για backgrounds
    },
    background: {
      default: '#fdfbf9',
      paper: '#ffffff',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#5d4037',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 800,
    },
    h4: {
      fontWeight: 700,
      color: '#4a3728',
    },
    button: {
      textTransform: 'none', // Για να μην είναι όλα τα κουμπιά ΚΕΦΑΛΑΙΑ
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12, // Όλα τα κουμπιά και οι κάρτες θα έχουν αυτή την κλίση
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 20px',
        },
      },
    },
  },
});

export default theme;