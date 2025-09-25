import React from "react";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";


export const NavItem = ({path, title}) =>{
    return(
        <React.Fragment>
            <Grid size={2}>
                <Link to={path} >
                <Button variant="contained" fullWidth>{title}</Button>
                </Link>
            </Grid>
        </React.Fragment>
    )
}