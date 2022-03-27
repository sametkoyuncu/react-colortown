import { useState, useEffect } from "react";
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
import GradientDetailCard from "layouts/gradients/details/components/GradientDetailCard";

// data
import gradients from "data/gradients";

function GradientDetails() {
  const { id } = useParams();

  const [gradient, setGradient] = useState({
    id: "gradient_2",
    colors: [
      { hex: "#fc354c", rgb: "rgb(252, 53, 76)", hsl: "hsl(353, 97%, 60%)" },
      { hex: "#0abfbc", rgb: "rgb(10, 191, 188)", hsl: "hsl(179, 90%, 39%)" },
    ],
    direction: "to right",
    likes: 11,
    tags: [],
  });

  useEffect(() => {
    const gradientById = gradients.find((item) => item.id === id);
    setGradient(gradientById);
  }, [id]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
              <CtColorPreviewCard
                bgColor={`linear-gradient(${gradient.direction}, ${gradient.colors[0].hex}, ${gradient.colors[1].hex})`}
              />
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
