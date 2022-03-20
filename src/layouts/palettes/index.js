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
import PaletteCard from "layouts/palettes/components/PaletteCard";

function Palettes() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <PaletteCard bgColors={["#FFC300", "#FF5733", "#C70039", "#900C3F"]} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <PaletteCard bgColors={["#9ADCFF", "#FFF89A", "#FFB2A6", "#FF8AAE"]} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <PaletteCard bgColors={["#46244C", "#712B75", "#C74B50", "#D49B54"]} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <PaletteCard bgColors={["#557B83", "#39AEA9", "#C70039", "#900C3F"]} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <PaletteCard bgColors={["#F4FCD9", "#C5D8A4", "#BB9981", "#534340"]} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <PaletteCard bgColors={["#F7E2E2", "#61A4BC", "#5B7DB1", "#1A132F"]} />
            </Grid>
          </Grid>
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Palettes;
