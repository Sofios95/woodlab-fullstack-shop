import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HomeIcon from "@mui/icons-material/Home";

interface LocationState {
  orderId?: string | number;
}

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState;
  const orderId = state?.orderId || "N/A";

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 8, md: 12 } }}>
      <Paper
        elevation={6}
        sx={{
          p: { xs: 4, md: 6 },
          textAlign: "center",
          borderRadius: 4,
          borderTop: "8px solid #4caf50", // Πράσινο για επιτυχία
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <CheckCircleOutlineIcon
          sx={{ fontSize: 90, color: "#4caf50", mb: 2 }}
        />

        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "#2c3e50",
            mb: 2,
            fontSize: { xs: "1.8rem", md: "2.125rem" },
          }}
        >
          Η παραγγελία ολοκληρώθηκε!
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: "#5d4037", mb: 4, fontSize: "1.1rem" }}
        >
          Ευχαριστούμε για την εμπιστοσύνη σας στο <strong>Woodlab</strong>. 🪵
        </Typography>

        <Box
          sx={{
            bgcolor: "#fdfbf9",
            p: 3,
            borderRadius: 3,
            mb: 4,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px dashed #a67c52",
            gap: 1,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ color: "#7f8c8d", fontWeight: 500 }}
          >
            Αριθμός Παραγγελίας:
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 900, color: "#4a3728" }}>
            #{orderId}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{ color: "#7f8c8d", mb: 4, lineHeight: 1.6 }}
        >
          Θα λάβετε σύντομα ένα email επιβεβαίωσης με τις λεπτομέρειες της
          αποστολής σας.
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Button
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          onClick={() => navigate("/")}
          sx={{
            bgcolor: "#4a3728",
            px: 5,
            py: 1.8,
            borderRadius: "50px",
            fontWeight: 700,
            textTransform: "none",
            fontSize: "1rem",
            "&:hover": { bgcolor: "#a67c52", transform: "translateY(-2px)" },
            transition: "all 0.2s",
          }}
        >
          Επιστροφή στο Κατάστημα
        </Button>
      </Paper>
    </Container>
  );
}

export default OrderSuccess;
