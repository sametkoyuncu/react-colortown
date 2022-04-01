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

  const INITIAL_STATE = {
    id: "color_0",
    hex: "#ffffff",
    rgb: "rgb(0,0,0)",
    hsl: "hsl(0,0%,0%)",
    likes: 0,
    tags: [],
  };

  // TODO: INITIAL_STATE yerine 404 olmalı
  const color = colors.find((item) => item.id === id) || INITIAL_STATE;

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
