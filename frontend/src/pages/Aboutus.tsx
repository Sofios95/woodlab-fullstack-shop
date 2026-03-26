import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Aboutus: React.FC = () => {
  return (
    <Box>
      <Box
        sx={{
          height: { xs: "300px", md: "450px" },
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://woodlab.gr/wp-content/uploads/2022/05/WoodLab_Background.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: { xs: "2.5rem", md: "4rem" },
            textShadow: "2px 2px 10px rgba(0,0,0,0.5)",
          }}
        >
          Η Ιστορία μας
        </Typography>
      </Box>
      <Container
        maxWidth="md"
        sx={{ mt: -8, mb: 8, position: "relative", zIndex: 2 }}
      >
        <Paper
          elevation={6}
          sx={{
            p: { xs: 4, md: 8 },
            borderRadius: 4,
            lineHeight: 1.8,
            bgcolor: "#fff",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: "#4a3728", fontWeight: "bold" }}
          >
            Λίγα λόγια για εμάς
          </Typography>

          <Box
            sx={{ width: "80px", height: "4px", bgcolor: "#a67c52", mb: 4 }}
          />

          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: "1.1rem", color: "#34495e", textAlign: "justify" }}
          >
            Είμαστε ο <strong>Στέλιος</strong> και ο{" "}
            <strong>Μάριος Χαλκιαδάκης</strong> και το WoodLab είναι το
            εργαστήριό μας. Οι γνώσεις που μας μετέδωσε ο πατέρας μας Γιώργος,
            έχοντας πάνω από 40 χρόνια εμπειρίας στην τέχνη της επιπλοποιίας, σε
            συνδυασμό με την αγάπη μας για το ξύλο και το design, αποτελούν τις
            βάσεις μας.
          </Typography>

          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: "1.1rem", color: "#34495e", textAlign: "justify" }}
          >
            Πατώντας σε αυτές γερά, συνεχίζουμε να εξελισσόμαστε αναζητώντας
            διαρκώς καινούργιες τεχνικές, ώστε να ανταποκρινόμαστε στις
            απαιτήσεις της εποχής μας, σεβόμενοι πάντοτε την τέχνη μας και τους
            ανθρώπους που την εμπιστεύονται.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography
            variant="body1"
            sx={{
              fontSize: "1.1rem",
              color: "#34495e",
              fontStyle: "italic",
              mb: 4,
            }}
          >
            "Κατασκευάζουμε χειροποίητα έπιπλα κατά παραγγελία με γνώμονα την
            αντοχή, την ποιότητα, το στυλ και την διαχρονικότητα."
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Button
              component={Link}
              to="/contact"
              variant="contained"
              size="large"
              endIcon={<ChevronRightIcon />}
              sx={{
                bgcolor: "#4a3728",
                padding: "12px 30px",
                borderRadius: "30px",
                fontSize: "1rem",
                "&:hover": {
                  bgcolor: "#a67c52",
                  transform: "translateY(-2px)",
                  boxShadow: 4,
                },
                transition: "all 0.3s",
              }}
            >
              Επικοινωνήστε μαζί μας
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Aboutus;
