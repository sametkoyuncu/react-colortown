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
import CtColorTagsCard from "components/CtColorTagsCard";
import ColorDetailCard from "layouts/colors/details/components/ColorDetailCard";

// data
import colors from "data/colors";

function ColorDetails() {
  const { id } = useParams();

  const [color, setColor] = useState({
    id: "",
    hex: "",
    rgb: "",
    hsl: "",
    likes: 0,
    tags: [],
  });

  useEffect(() => {
    const colorById = colors.find((item) => item.id === id);
    setColor(colorById);
  }, [id]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Grid container spacing={2}>
            <Grid item container xs={12} sm={5}>
              <Grid item xs={12}>
                <CtColorPreviewCard bgColor={color.rgb} />
              </Grid>
              {!!color.tags.length && (
                <Grid item xs={12} mt={1}>
                  <CtColorTagsCard tags={color.tags} />
                </Grid>
              )}
            </Grid>
            <Grid item xs={12} sm={7}>
              <ColorDetailCard hexCode={color.hex} rgbCode={color.rgb} hslCode={color.hsl} />
            </Grid>
          </Grid>
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ColorDetails;
