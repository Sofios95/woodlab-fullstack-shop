import React from "react";
import { 
  Container, Typography, Box, Paper, Grid, Link, Divider 
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

function Contact() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 10 } }}>
      <Paper 
        elevation={6} 
        sx={{ 
          p: { xs: 3, md: 8 }, 
          borderRadius: 4, 
          bgcolor: "#fffcf9", // Πολύ ελαφρύ κρέμ για "ξύλινη" αίσθηση
          border: "1px solid #f0e6dd"
        }}
      >
        <Grid container spacing={6} alignItems="center">
          
          {/* Αριστερή πλευρά: Τίτλος & Πληροφορίες */}
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h3" 
              gutterBottom 
              sx={{ 
                fontWeight: 800, 
                color: "#4a3728",
                fontSize: { xs: "2rem", md: "3rem" } 
              }}
            >
              Επικοινωνήστε μαζί μας
            </Typography>
            
            <Box sx={{ width: "80px", height: "5px", bgcolor: "#a67c52", mb: 4 }} />
            
            <Typography variant="body1" sx={{ color: "#5d4037", mb: 5, fontSize: "1.1rem" }}>
              Είμαστε εδώ για να λύσουμε κάθε απορία σας σχετικά με τις ξύλινες κατασκευές μας. 
              Μη διστάσετε να μας καλέσετε ή να μας στείλετε email.
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              
              <ContactItem 
                icon={<EmailIcon sx={{ color: "#fff" }} />} 
                title="Email" 
                content="info@woodlab.gr" 
                link="mailto:info@woodlab.gr"
              />

              <ContactItem 
                icon={<LocationOnIcon sx={{ color: "#fff" }} />} 
                title="Διεύθυνση" 
                content="Μαβίλη 1, Ηλιούπολη, 16345" 
              />

              <ContactItem 
                icon={<PhoneIphoneIcon sx={{ color: "#fff" }} />} 
                title="Τηλέφωνα Επικοινωνίας" 
                content={
                  <>
                    <Box sx={{ fontWeight: 600 }}>6945663004 (Στέλιος)</Box>
                    <Box sx={{ fontWeight: 600 }}>6946548303 (Μάριος)</Box>
                  </>
                } 
              />
            </Box>
          </Grid>

          {/* Δεξιά πλευρά: Χάρτης */}
          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                borderRadius: 4, 
                overflow: "hidden", 
                boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
                height: { xs: "300px", md: "450px" },
                border: "4px solid #fff"
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.54321!2d23.754321!3d37.9321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDU1JzU1LjYiTiAyM8KwNDUnMTUuNiJF!5e0!3m2!1sel!2sgr!4v1620000000000!5m2!1sel!2sgr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="WoodLab Location"
              ></iframe>
            </Box>
          </Grid>

        </Grid>
      </Paper>
    </Container>
  );
}

// Helper Component για τις πληροφορίες
function ContactItem({ icon, title, content, link }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
      <Box 
        sx={{ 
          bgcolor: "#4a3728", 
          p: 1.5, 
          borderRadius: "50%", 
          display: "flex",
          boxShadow: "0px 4px 10px rgba(74, 55, 40, 0.3)" 
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography 
          variant="caption" 
          sx={{ 
            color: "#a67c52", 
            fontWeight: 700, 
            textTransform: "uppercase",
            letterSpacing: 1
          }}
        >
          {title}
        </Typography>
        {link ? (
          <Link 
            href={link} 
            underline="none" 
            sx={{ 
              display: "block",
              color: "#2c3e50", 
              fontWeight: 600, 
              fontSize: "1.1rem",
              "&:hover": { color: "#a67c52" } 
            }}
          >
            {content}
          </Link>
        ) : (
          <Typography variant="body1" sx={{ color: "#2c3e50", fontWeight: 600, fontSize: "1.1rem" }}>
            {content}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default Contact;