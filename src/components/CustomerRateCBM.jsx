import React,{useState} from "react";
import { Button, Grid, TextField, Card, CardContent, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


export const CustomerRateCBM = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [cbm, setCbm] = useState();
  const [customerRate, setCustomerRate] = useState();
  const [ourRate, setOurRate] = useState()

  const handleNext =()=>{
    const type = "BY_CBM";
    const payload = {
      cbm,
      customerRate,
      ourRate
    }
    const action = {
      type,
      payload
    }
    dispatch(action);
    navigate("/")
    }

  const handleCancel = () => {
    // Handle cancel action
    setCbm(Number());
    setCustomerRate(Number());
    setOurRate(Number());
  }

  const calculateCBM = () =>{
    return (cbm * customerRate).toFixed(2)
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full screen height
        bgcolor: "#f5f5f5", // Light background
        border: 1,
        borderRadius: 2
      }}
    >
      <Card sx={{ width: 400, p: 2, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField  value={cbm} onChange={(e)=>setCbm(Number(e.target.value))} label="Enter CBM" variant="outlined" fullWidth />
            </Grid>

            <Grid size={12}>
              <TextField value={customerRate} onChange={(e)=>setCustomerRate(Number(e.target.value))} label="Enter Customer Rate" variant="outlined" fullWidth />
            </Grid>

            <Grid size={12}>
              <TextField value={ourRate} onChange={(e)=>setOurRate(Number(e.target.value))} label="Enter Our Rate" variant="outlined" fullWidth />
            </Grid>

            {/* Total Value of CBM value and customerRate */}
            
            <Grid size = {12}>
              <Typography>{isNaN(calculateCBM()) ? "": calculateCBM()}</Typography>
            </Grid>

            <Grid size={6}>
              <Button onClick={handleCancel} variant="outlined" fullWidth>Cancel</Button>
            </Grid>

            <Grid size={6}>
              <Button disabled={!(cbm && customerRate > ourRate)} onClick={handleNext} variant="contained" fullWidth>Next</Button>
            </Grid>
          </Grid>

        </CardContent>
      </Card>
    </Box>
  );
};
