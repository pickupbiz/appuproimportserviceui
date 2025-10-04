import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { CustomerRateKG } from "./CustomerRateKG";
import { CustomerRateCBM } from "./CustomerRateCBM";
import { NavList } from "./Navlist";
import { Summary } from "./Summary";

export const Landing = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <NavList />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customerratekg" element={<CustomerRateKG />} />
          <Route path="/customerratecbm" element={<CustomerRateCBM />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};
