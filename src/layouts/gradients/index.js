/**
=========================================================
* Soft UI Dashboard React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Dashboard layout components
import GradientCard from "layouts/gradients/components/GradientCard";

function Gradients() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={6} md={3}>
              <GradientCard bgColor="linear-gradient(to right, #de6262, #ffb88c)" />
            </Grid>
            <Grid item xs={6} md={3}>
              <GradientCard bgColor="linear-gradient(to right, #fc354c, #0abfbc)" />
            </Grid>
            <Grid item xs={6} md={3}>
              <GradientCard bgColor="linear-gradient(to right, #414d0b, #727a17)" />
            </Grid>
            <Grid item xs={6} md={3}>
              <GradientCard bgColor="linear-gradient(to right, #e43a15, #e65245)" />
            </Grid>
            <Grid item xs={6} md={3}>
              <GradientCard bgColor="linear-gradient(to right, #c04848, #480048)" />
            </Grid>
            <Grid item xs={6} md={3}>
              <GradientCard bgColor="linear-gradient(to right, #5f2c82, #49a09d)" />
            </Grid>
          </Grid>
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Gradients;
