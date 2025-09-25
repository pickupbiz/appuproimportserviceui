import React, { useState } from "react";
import { Button, Grid, TextField, Card, CardContent, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const CustomerRateKG = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [kg, setKg] = useState()
    const [customerRate, setCustomerRate]= useState();
    const [ourRate, setOurRate] = useState();

    const handleNext = () =>{
          const type ="BY_WEIGTH";
          const payload = {
            kg,
            customerRate,
            ourRate
          }  
          const action = {
              type,
              payload
            }
            dispatch(action);
            navigate("/customerratecbm")
    }

const handleCancel = () => {
    // Handle cancel action
    setKg(Number());
    setCustomerRate(Number());
    setOurRate(Number());
}

const calculateKG=() =>{
  return( kg * customerRate).toFixed(2)
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
              <TextField value={kg} onChange={(e)=>setKg(Number(e.target.value))} label="Enter KG" variant="outlined" fullWidth />
            </Grid>

            <Grid size={12}>
              <TextField value={customerRate} onChange={(e)=>setCustomerRate(Number(e.target.value))} label="Enter Customer Rate" variant="outlined" fullWidth />
            </Grid>

            <Grid size={12}>
              <TextField value={ourRate} onChange={(e)=>setOurRate(Number(e.target.value))} label="Enter Our Rate" variant="outlined" fullWidth />
            </Grid>

            
            {/* Total Value of KG value and customerRate */}
            <Grid size ={12}>
              <Typography variant="h6"  sx={{textAlign: "center"}}>{isNaN(calculateKG()) ? "" : calculateKG()}</Typography>
            </Grid>

            <Grid size={6}>
              <Button onClick={handleCancel} variant="outlined" fullWidth>Cancel</Button>
            </Grid>

            {/* {console.log(customerRate > ourRate,"===============>",kg,"---", customerRate, "=====", ourRate) } */}
            
            <Grid size={6}>
              <Button disabled={!(kg && customerRate > ourRate)} onClick={handleNext} variant="contained" fullWidth>Next</Button>
            </Grid>
          </Grid>

        </CardContent>
      </Card>
    </Box>
  );
};