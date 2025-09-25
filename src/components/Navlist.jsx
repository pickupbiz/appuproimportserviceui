import React from "react";
import { Card, CardContent, Grid } from "@mui/material";
import { NavItem } from "./NavItem";



export const NavList = () =>{
    return(
        <React.Fragment>
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        <NavItem path="/" title="Home" />
                        <NavItem path="/customerratekg" title="CustomerRateKG" />
                        <NavItem path="/customerratecbm" title="CustomerRateCBM" />
                    </Grid>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}