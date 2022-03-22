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

// data
import gradients from "../../data/gradients";

// colortown context
import { useColorTown } from "../../context/colortown";

function Gradients() {
  const { ctGradients, setCtGradients } = useColorTown();

  const handleLikeBtnClick = (gradientId, reqType) => {
    if (reqType === "add") setCtGradients([...ctGradients, gradientId]);
    else if (reqType === "remove") {
      const newGradients = ctGradients.filter((id) => id !== gradientId);
      setCtGradients([...newGradients]);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Grid container spacing={2}>
            {gradients.map((gradient) => (
              <Grid key={gradient.id} item xs={12} sm={6} md={3}>
                <GradientCard
                  gradientId={gradient.id}
                  bgColor={`linear-gradient(${gradient.direction}, ${gradient.colors[0]}, ${gradient.colors[1]})`}
                  likesCount={gradient.likes}
                  isLiked={ctGradients.indexOf(gradient.id) >= 0}
                  handleLikeBtnClick={handleLikeBtnClick}
                />
              </Grid>
            ))}
          </Grid>
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Gradients;
