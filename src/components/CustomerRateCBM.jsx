import React, { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Card,
  CardContent,
  Box,
  Typography,
  Paper,
  Alert,
  Divider,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Calculate, ArrowForward, Cancel } from "@mui/icons-material";

export const CustomerRateCBM = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cbm, setCbm] = useState("");
  const [customerRate, setCustomerRate] = useState("");
  const [ourRate, setOurRate] = useState("");

  const handleNext = () => {
    const payload = {
      cbm: parseFloat(cbm),
      customerRate: parseFloat(customerRate),
      ourRate: parseFloat(ourRate),
      totalValue: calculateCBM(),
      timestamp: new Date().toLocaleString(),
    };

    dispatch({
      type: "BY_CBM",
      payload,
    });
    navigate("/summary");
  };

  const handleCancel = () => {
    setCbm("");
    setCustomerRate("");
    setOurRate("");
  };

  const calculateCBM = () => {
    if (cbm && customerRate) {
      return (parseFloat(cbm) * parseFloat(customerRate)).toFixed(2);
    }
    return 0;
  };

  const isFormValid =
    cbm &&
    customerRate &&
    ourRate &&
    parseFloat(customerRate) > parseFloat(ourRate);

  const profit =
    (parseFloat(customerRate) - parseFloat(ourRate)) * parseFloat(cbm);

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
      <Card
        sx={{
          width: 450,
          maxWidth: "90vw",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Box sx={{ bgcolor: "primary.main", p: 2, textAlign: "center" }}>
          <Typography variant="h5" color="white" fontWeight="bold">
            CBM Rate Calculator
          </Typography>
        </Box>

        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                value={cbm}
                onChange={(e) => setCbm(e.target.value.replace(/[^0-9.]/g, ""))}
                label="Enter CBM (m³)"
                variant="outlined"
                fullWidth
                type="number"
                InputProps={{ endAdornment: "m³" }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                value={customerRate}
                onChange={(e) =>
                  setCustomerRate(e.target.value.replace(/[^0-9.]/g, ""))
                }
                label="Customer Rate ($/m³)"
                variant="outlined"
                fullWidth
                type="number"
                InputProps={{ startAdornment: "$" }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                value={ourRate}
                onChange={(e) =>
                  setOurRate(e.target.value.replace(/[^0-9.]/g, ""))
                }
                label="Our Rate ($/m³)"
                variant="outlined"
                fullWidth
                type="number"
                InputProps={{ startAdornment: "$" }}
              />
            </Grid>

            {/* Calculation Summary */}
            {(cbm || customerRate || ourRate) && (
              <Grid item xs={12}>
                <Paper elevation={1} sx={{ p: 2, bgcolor: "grey.50" }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Calculate sx={{ mr: 1 }} /> Calculation Summary
                  </Typography>

                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="body2">Total Value:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" fontWeight="bold">
                        ${isNaN(calculateCBM()) ? "0.00" : calculateCBM()}
                      </Typography>
                    </Grid>

                    {customerRate && ourRate && (
                      <>
                        <Grid item xs={6}>
                          <Typography variant="body2">
                            Profit Margin:
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="body2"
                            fontWeight="bold"
                            color={profit > 0 ? "success.main" : "error.main"}
                          >
                            ${isNaN(profit) ? "0.00" : profit.toFixed(2)}
                          </Typography>
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Paper>
              </Grid>
            )}

            {/* Validation Alert */}
            {customerRate &&
              ourRate &&
              parseFloat(customerRate) <= parseFloat(ourRate) && (
                <Grid item xs={12}>
                  <Alert severity="warning">
                    Customer rate must be higher than our rate!
                  </Alert>
                </Grid>
              )}

            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
            </Grid>

            <Grid item xs={6}>
              <Button
                onClick={handleCancel}
                variant="outlined"
                fullWidth
                startIcon={<Cancel />}
                size="large"
              >
                Clear
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button
                disabled={!isFormValid}
                onClick={handleNext}
                variant="contained"
                fullWidth
                endIcon={<ArrowForward />}
                size="large"
                sx={{
                  bgcolor: isFormValid ? "success.main" : "grey.400",
                  "&:hover": {
                    bgcolor: isFormValid ? "success.dark" : "grey.400",
                  },
                }}
              >
                View Summary
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
