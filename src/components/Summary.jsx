import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import {
  CheckCircle,
  LocalShipping,
  AttachMoney,
  Inventory, 
  TrendingUp,
  ArrowBack,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const Summary = () => {
  const navigate = useNavigate();
  const cbmData = useSelector((state) => state.transportReducer.bycbm);

  
  if (!cbmData || Object.keys(cbmData).length === 0) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Card sx={{ width: 400, textAlign: "center", p: 4 }}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No CBM Data Available
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            startIcon={<ArrowBack />}
            sx={{ mt: 2 }}
          >
            Go Back to Calculator
          </Button>
        </Card>
      </Box>
    );
  }

  const totalValue = (cbmData.cbm * cbmData.customerRate).toFixed(2);
  const profit = (cbmData.customerRate - cbmData.ourRate) * cbmData.cbm;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        p: 2,
      }}
    >
      <Box sx={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Header */}
        <Paper
          elevation={3}
          sx={{ p: 3, mb: 3, bgcolor: "white", borderRadius: 3 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CheckCircle
                sx={{ fontSize: 40, color: "success.main", mr: 2 }}
              />
              <Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Rate Calculation Summary
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Calculated on {cbmData.timestamp}
                </Typography>
              </Box>
            </Box>
            <Chip
              label="CBM Calculation"
              color="primary"
              icon={<Inventory />} 
            />
          </Box>
        </Paper>

        {/* Main Summary Card */}
        <Card sx={{ borderRadius: 3, overflow: "hidden", mb: 3 }}>
          <Box sx={{ bgcolor: "primary.main", p: 2 }}>
            <Typography
              variant="h6"
              color="white"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <LocalShipping sx={{ mr: 1 }} />
              Transport Details
            </Typography>
          </Box>

          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {/* Basic Information */}
              <Grid item xs={12} md={6}>
                <Paper elevation={1} sx={{ p: 2, height: "100%" }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Basic Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        CBM Volume:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" fontWeight="bold">
                        {cbmData.cbm} m³
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        Customer Rate:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="success.main"
                      >
                        ${cbmData.customerRate}/m³
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        Our Rate:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="info.main"
                      >
                        ${cbmData.ourRate}/m³
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              {/* Financial Summary */}
              <Grid item xs={12} md={6}>
                <Paper elevation={1} sx={{ p: 2, height: "100%" }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Financial Summary
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        Total Value:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="success.main"
                      >
                        ${totalValue}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        Profit:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color={profit > 0 ? "success.main" : "error.main"}
                      >
                        ${profit.toFixed(2)}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        Profit Margin:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Chip
                        label={`${((profit / totalValue) * 100).toFixed(1)}%`}
                        color={profit > 0 ? "success" : "error"}
                        icon={<TrendingUp />}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate("/")}
            size="large"
          >
            Back to Calculator
          </Button>
          <Button
            variant="contained"
            startIcon={<AttachMoney />}
            size="large"
            onClick={() => window.print()}
          >
            Print Summary
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
