import React from "react";
import { 
  Container, Typography, Box, Paper, Grid, Link 
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

function Contact() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={4} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, bgcolor: "#fffcf9" }}>
        
        {/* Τίτλος */}
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#4a3728" }}>
          Επικοινωνήστε μαζί μας
        </Typography>
        <Box sx={{ width: "60px", height: "4px", bgcolor: "#a67c52", mx: "auto", mb: 5 }} />

        <Grid container spacing={4} alignItems="center">
          
          {/* Χάρτης */}
          <Grid item xs={12} md={6}>
            <Box sx={{ borderRadius: 3, overflow: "hidden", boxShadow: 2, height: "300px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.3456!2d23.75!3d37.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDU1JzQ4LjAiTiAyM8KwNDUnMDAuMCJF!5e0!3m2!1sel!2sgr!4v123456789"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </Box>
          </Grid>

          {/* Πληροφορίες */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              
              <ContactItem 
                icon={<EmailIcon color="primary" />} 
                title="Email" 
                content="info@woodlab.gr" 
                link="mailto:info@woodlab.gr"
              />

              <ContactItem 
                icon={<LocationOnIcon color="primary" />} 
                title="Διεύθυνση" 
                content="Μαβίλη 1, Ηλιούπολη, 16345" 
              />

              <ContactItem 
                icon={<PhoneIphoneIcon color="primary" />} 
                title="Τηλέφωνα" 
                content={
                  <>
                    6945663004 (Στέλιος) <br />
                    6946548303 (Μάριος)
                  </>
                } 
              />

            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

// Ένα μικρό "βοηθητικό" component για να μη γράφουμε τα ίδια
function ContactItem({ icon, title, content, link }) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
      <Box sx={{ bgcolor: "#f0e6dd", p: 1, borderRadius: 2, display: "flex" }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ color: "#a67c52", fontWeight: "bold", textTransform: "uppercase" }}>
          {title}
        </Typography>
        {link ? (
          <Link href={link} underline="hover" sx={{ color: "#2c3e50", fontWeight: 500 }}>
            {content}
          </Link>
        ) : (
          <Typography variant="body1" sx={{ color: "#2c3e50", fontWeight: 500 }}>
            {content}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default Contact;