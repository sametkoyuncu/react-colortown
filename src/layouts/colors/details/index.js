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
import ColorDetailCard from "layouts/colors/details/components/ColorDetailCard";

// data
import colors from "data/colors";

// prop-types is a library for typechecking of props
// import PropTypes from "prop-types";

function ColorDetails() {
  const { id } = useParams();
  // really I don't know we need useState and useEffect.
  // may be just get color by id with 'find (line 32)'
  const [color, setColor] = useState({});

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
            <Grid item xs={12} sm={5}>
              <CtColorPreviewCard bgColor={color.rgb} />
            </Grid>
            <Grid item xs={12} sm={7}>
              {/* rgbToHex(color.rgbCode)
              rgbToHsl(color.rgbCode) */}
              <ColorDetailCard hexCode={color.hex} rgbCode={color.rgb} hslCode={color.hsl} />
            </Grid>
          </Grid>
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

// ColorDetails.defaultProps = {
//   color: {
//     id: "color_1",
//     hexCode: "#ff5858",
//     likes: 0,
//     tags: [],
//   },
// };

// // Typechecking props for the SuiBox
// ColorDetails.propTypes = {
//   // eslint-disable-next-line react/forbid-prop-types
//   color: PropTypes.object,
// };

export default ColorDetails;
