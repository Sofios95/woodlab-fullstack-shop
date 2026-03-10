import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Typography, IconButton, Stack, Divider } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: "#2c1e14", // Πολύ σκούρο καφέ/μαύρο για αντίθεση
        color: "#f0e6dd", 
        py: 6, 
        mt: 'auto', // Σπρώχνει το footer κάτω αν το περιεχόμενο είναι λίγο
        borderTop: "4px solid #a67c52" 
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between" alignItems="center">
          
          {/* Social & Links */}
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: "#a67c52" }}>
              WOODLAB
            </Typography>
            <Stack direction="row" spacing={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
              <IconButton 
                component="a" 
                href="https://www.facebook.com/Woodlab.gr/?locale=el_GR" 
                target="_blank" 
                sx={{ color: "#f0e6dd", "&:hover": { color: "#a67c52" } }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                component="a" 
                href="https://www.instagram.com/woodlabgr/" 
                target="_blank"
                sx={{ color: "#f0e6dd", "&:hover": { color: "#a67c52" } }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                component="a" 
                href="https://woodlab.gr/" 
                target="_blank"
                sx={{ color: "#f0e6dd", "&:hover": { color: "#a67c52" } }}
              >
                <LanguageIcon />
              </IconButton>
            </Stack>
          </Grid>

          {/* About Link */}
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Typography 
              component={Link} 
              to="/aboutus" 
              sx={{ 
                color: "#f0e6dd", 
                textDecoration: "none", 
                fontWeight: 500,
                "&:hover": { color: "#a67c52", textDecoration: "underline" }
              }}
            >
              About Us
            </Typography>
          </Grid>

          {/* Copyright */}
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              © Copyright {currentYear} | by DevSof
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, bgcolor: "rgba(240, 230, 221, 0.1)" }} />

        {/* Το κρυφό link για τον Admin */}
        <Box sx={{ display: 'flex', justifyContent: 'center', opacity: 0.1 }}>
          <Typography 
            component={Link} 
            to="/secret-admin-gate" 
            sx={{ color: "inherit", textDecoration: "none", fontSize: "10px" }}
          >
            .
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

// Χρειάζεται και το Grid import
import { Grid } from "@mui/material";

export default Footer;