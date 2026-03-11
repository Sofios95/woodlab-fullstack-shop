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

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const orderId = location.state?.orderId || "N/A";

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 8, md: 12 } }}>
      <Paper
        elevation={6}
        sx={{
          p: { xs: 4, md: 6 },
          textAlign: "center",
          borderRadius: 4,
          borderTop: "8px solid #4caf50",
        }}
      >
        <CheckCircleOutlineIcon
          sx={{ fontSize: 80, color: "#4caf50", mb: 2 }}
        />

        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#2c3e50", mb: 2 }}
        >
          Η παραγγελία ολοκληρώθηκε!
        </Typography>

        <Typography variant="body1" sx={{ color: "#5d4037", mb: 4 }}>
          Ευχαριστούμε για την εμπιστοσύνη σας στο <strong>Woodlab</strong>.
        </Typography>

        <Box
          sx={{
            bgcolor: "#f9f9f9",
            p: 3,
            borderRadius: 2,
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px dashed #ccc",
          }}
        >
          <Typography variant="subtitle1" sx={{ color: "#7f8c8d" }}>
            Αριθμός Παραγγελίας:
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#4a3728" }}
          >
            #{orderId}
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ color: "#7f8c8d", mb: 4 }}>
          Θα λάβετε σύντομα email με τις λεπτομέρειες της αποστολής.
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Button
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          onClick={() => navigate("/")}
          sx={{
            bgcolor: "#4a3728",
            px: 4,
            py: 1.5,
            borderRadius: "30px",
            "&:hover": { bgcolor: "#a67c52" },
          }}
        >
          Επιστροφή στο Κατάστημα
        </Button>
      </Paper>
    </Container>
  );
}

export default OrderSuccess;
