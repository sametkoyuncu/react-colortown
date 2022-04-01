import { useParams } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// ColorTown layout components
import CtColorPreviewCard from "components/CtColorPreviewCard";
import CtColorTagsCard from "components/CtColorTagsCard";
import GradientDetailCard from "layouts/gradients/details/components/GradientDetailCard";

// data
import gradients from "data/gradients";

function GradientDetails() {
  const { id } = useParams();

  const INITIAL_STATE = {
    id: "gradient_0",
    colors: [
      { hex: "#ffffff", rgb: "rgb(0, 0, 0)", hsl: "hsl(0, 0%, 0%)" },
      { hex: "#fffffe", rgb: "rgb(0, 0, 0)", hsl: "hsl(0, 0%, 0%)" },
    ],
    direction: "to right",
    likes: 0,
    tags: [],
  };
  // TODO: INITIAL_STATE yerine 404 olmalı
  const gradient = gradients.find((item) => item.id === id) || INITIAL_STATE;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Grid container spacing={2}>
            <Grid item container xs={12} sm={5}>
              <Grid item xs={12}>
                <CtColorPreviewCard
                  bgColor={`linear-gradient(${gradient.direction}, ${gradient.colors[0].hex}, ${gradient.colors[1].hex})`}
                />
              </Grid>
              {!!gradient.tags.length && (
                <Grid item xs={12} mt={1}>
                  <CtColorTagsCard tags={gradient.tags} />
                </Grid>
              )}
            </Grid>
            <Grid item xs={12} sm={7}>
              <GradientDetailCard
                colorCodes1={gradient.colors[0]}
                colorCodes2={gradient.colors[1]}
              />
            </Grid>
          </Grid>
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default GradientDetails;
