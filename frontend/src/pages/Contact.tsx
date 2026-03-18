import React from "react";
import { 
  Container, Typography, Box, Paper, Link, Stack 
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

// Interface για τα props του ContactItem
interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
  link?: string;
}

function Contact() {
  const mapAddress = encodeURIComponent("Μαβίλη 1, Ηλιούπολη, 16345");
  // Διορθωμένο URL για το iframe embed
  const mapUrl = `https://maps.google.com/maps?q=${mapAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 3, md: 5 }, 
          borderRadius: 4, 
          bgcolor: "#fffcf9",
          border: "1px solid #f0e6dd" 
        }}
      >
        <Typography variant="h4" align="center" sx={{ fontWeight: 800, color: "#4a3728", mb: 1 }}>
          Επικοινωνία
        </Typography>
        <Box sx={{ width: "50px", height: "4px", bgcolor: "#a67c52", mx: "auto", mb: 5, borderRadius: 2 }} />

        {/* Αντικατάσταση Grid με Box Flex/Grid για σιγουριά στο build */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 4,
          alignItems: 'stretch'
        }}>
          
          {/* Αριστερή Στήλη: Πληροφορίες */}
          <Box sx={{ flex: 1 }}>
            <Stack spacing={3.5} sx={{ height: '100%', justifyContent: 'center' }}>
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
                  <Box sx={{ lineHeight: 1.6 }}>
                    6945663004 (Στέλιος) <br />
                    6946548303 (Μάριος)
                  </Box>
                } 
              />
            </Stack>
          </Box>

          {/* Δεξιά Στήλη: Χάρτης */}
          <Box sx={{ flex: 1.4 }}>
            <Box 
              sx={{ 
                borderRadius: 3, 
                overflow: "hidden", 
                height: { xs: "250px", md: "350px" }, 
                border: "1px solid #ddd",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
              }}
            >
              <iframe
                title="Woodlab Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                src={mapUrl}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

// Το ContactItem με ορισμένα Types
function ContactItem({ icon, title, content, link }: ContactItemProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2.5 }}>
      <Box sx={{ 
        bgcolor: "#4a3728", 
        minWidth: 42,
        height: 42,
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 10px rgba(74, 55, 40, 0.2)"
      }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="caption" sx={{ color: "#a67c52", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
          {title}
        </Typography>
        {link ? (
          <Link href={link} underline="none" sx={{ display: "block", color: "#2c3e50", fontWeight: 700, fontSize: "1rem", "&:hover": { color: "#a67c52" } }}>
            {content}
          </Link>
        ) : (
          <Typography variant="body2" sx={{ color: "#2c3e50", fontWeight: 700, fontSize: "1rem" }}>
            {content}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default Contact;