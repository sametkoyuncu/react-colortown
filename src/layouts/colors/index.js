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
import ColorCard from "layouts/colors/components/ColorCard";

function Colors() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <ColorCard bgColor="#f857a6" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ColorCard bgColor="#ff5858" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ColorCard bgColor="#4b6cb7" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ColorCard bgColor="#182848" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ColorCard bgColor="#FC354C" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ColorCard bgColor="#0ABFBC" />
            </Grid>
          </Grid>
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Colors;
