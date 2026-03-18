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
        bgcolor: "#2c1e14", 
        color: "#f0e6dd", 
        py: 6, 
        mt: 'auto', 
        borderTop: "4px solid #a67c52" 
      }}
    >
      <Container maxWidth="lg">
        {/* Αντικατάσταση Grid με Box Flex για σταθερότητα στο Build */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: 'center',
          gap: 4
        }}>
          
          {/* Social & Links */}
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: "#a67c52", letterSpacing: 1 }}>
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
          </Box>

          {/* About Link */}
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Typography 
              component={Link} 
              to="/aboutus" 
              sx={{ 
                color: "#f0e6dd", 
                textDecoration: "none", 
                fontWeight: 600,
                fontSize: "1.1rem",
                "&:hover": { color: "#a67c52", textDecoration: "underline" }
              }}
            >
              About Us
            </Typography>
          </Box>

          {/* Copyright */}
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'right' } }}>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              © Copyright {currentYear} | by DevSof
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3, bgcolor: "rgba(240, 230, 221, 0.1)" }} />

        {/* Το κρυφό link για τον Admin */}
        <Box sx={{ display: 'flex', justifyContent: 'center', opacity: 0.05 }}>
          <Typography 
            component={Link} 
            to="/secret-admin-gate" 
            sx={{ color: "inherit", textDecoration: "none", fontSize: "10px", cursor: 'default' }}
          >
            .
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;