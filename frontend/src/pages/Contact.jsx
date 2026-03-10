import React from "react";
import { 
  Container, Typography, Box, Paper, Grid, Link, Stack 
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

function Contact() {
  // Εδώ βάζουμε τη διεύθυνση για τον χάρτη (URL Encoded)
  const mapAddress = encodeURIComponent("Μαβίλη 1, Ηλιούπολη, 16345");
  const mapUrl = `https://maps.google.com/maps?q=${mapAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 2, md: 4 }, 
          borderRadius: 3, 
          bgcolor: "#fffcf9",
          border: "1px solid #f0e6dd" 
        }}
      >
        <Typography variant="h4" align="center" sx={{ fontWeight: 800, color: "#4a3728", mb: 1 }}>
          Επικοινωνία
        </Typography>
        <Box sx={{ width: "40px", height: "3px", bgcolor: "#a67c52", mx: "auto", mb: 4 }} />

        <Grid container spacing={3} alignItems="stretch">
          
          {/* Αριστερή Στήλη: Πληροφορίες - Πιο "μαζεμένες" */}
          <Grid item xs={12} md={5}>
            <Stack spacing={2.5} sx={{ height: '100%', justifyContent: 'center' }}>
              <ContactItem 
                icon={<EmailIcon fontSize="small" sx={{ color: "#fff" }} />} 
                title="Email" 
                content="info@woodlab.gr" 
                link="mailto:info@woodlab.gr"
              />
              <ContactItem 
                icon={<LocationOnIcon fontSize="small" sx={{ color: "#fff" }} />} 
                title="Διεύθυνση" 
                content="Μαβίλη 1, Ηλιούπολη, 16345" 
              />
              <ContactItem 
                icon={<PhoneIphoneIcon fontSize="small" sx={{ color: "#fff" }} />} 
                title="Τηλέφωνα" 
                content={
                  <Box sx={{ lineHeight: 1.4 }}>
                    6945663004 (Στέλιος) <br />
                    6946548303 (Μάριος)
                  </Box>
                } 
              />
            </Stack>
          </Grid>

          {/* Δεξιά Στήλη: Χάρτης */}
          <Grid item xs={12} md={7}>
            <Box 
              sx={{ 
                borderRadius: 2, 
                overflow: "hidden", 
                height: "300px", 
                border: "1px solid #ddd",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
              }}
            >
              <iframe
                title="Woodlab Location"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={mapUrl}
                allowFullScreen
              ></iframe>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

// Μικρότερο και πιο κομψό Item
function ContactItem({ icon, title, content, link }) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
      <Box sx={{ 
        bgcolor: "#4a3728", 
        minWidth: 36,
        height: 36,
        borderRadius: "10px", // Τετραγωνισμένο με στρογγυλές γωνίες αντί για κύκλο
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 0.5
      }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="caption" sx={{ color: "#a67c52", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>
          {title}
        </Typography>
        {link ? (
          <Link href={link} underline="none" sx={{ display: "block", color: "#2c3e50", fontWeight: 600, fontSize: "0.95rem", "&:hover": { color: "#a67c52" } }}>
            {content}
          </Link>
        ) : (
          <Typography variant="body2" sx={{ color: "#2c3e50", fontWeight: 600, fontSize: "0.95rem" }}>
            {content}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default Contact;