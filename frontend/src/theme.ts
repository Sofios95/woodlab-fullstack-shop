import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4a3728', // Σκούρο καφέ (Coffee Bean)
      light: '#a67c52', // Χρώμα ξύλου (Oak)
      dark: '#2c1e14',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f0e6dd', // Κρέμ/Μπεζ
      contrastText: '#4a3728',
    },
    background: {
      default: '#fffcf9', // Πολύ ελαφρύ "ξύλινο" λευκό
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
      letterSpacing: '-0.5px',
    },
    h4: {
      fontWeight: 700,
      color: '#4a3728',
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none', 
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 12, 
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(74, 55, 40, 0.2)',
          },
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#a67c52', // Αλλαγή σε light wood στο hover
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)', // Πολύ απαλή σκιά
          border: '1px solid rgba(166, 124, 82, 0.1)', // Διακριτικό περίγραμμα
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#4a3728',
        },
      },
    },
  },
});

export default theme;