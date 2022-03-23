/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
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
import CtColorPreviewCard from "components/CtColorPreviewCard";
import ColorDataCard from "layouts/colorDetails/components/ColorDataCard";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

function ColorDetails(rgbCode) {
  // rgb to hex functions
  const componentToHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  const rgbToHex = (r, g, b) => `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;

  // rgb to hsl function
  const rgbToHsl = (r, g, b) => {
    // eslint-disable-next-line no-param-reassign
    r /= 255;
    // eslint-disable-next-line no-param-reassign
    g /= 255;
    // eslint-disable-next-line no-param-reassign
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h;
    let s;
    const l = (max + min) / 2;

    if (max === min) {
      // eslint-disable-next-line no-multi-assign
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
      }
      h /= 6;
    }

    // return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100)];
    return `hsl(${Math.floor(h * 360)}, ${Math.floor(s * 100)}%, ${Math.floor(l * 100)}%)`;
  };

  const hexCode = rgbToHex(...rgbCode);
  const hslCode = rgbToHsl(...rgbCode);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
              <CtColorPreviewCard bgColor={`rgb(${rgbCode[0]}, ${rgbCode[1]}, ${rgbCode[2]})`} />
            </Grid>
            <Grid item xs={12} sm={7}>
              <ColorDataCard
                hexCode={hexCode}
                rgbCode={`rgb(${rgbCode[0]}, ${rgbCode[1]}, ${rgbCode[2]})`}
                hslCode={hslCode}
              />
            </Grid>
          </Grid>
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

ColorDetails.defaultProps = {
  // id: "",
  rgbCode: [0, 0, 0],
  // likes: 0,
  // tags: [],
};

// Typechecking props for the SuiBox
ColorDetails.propTypes = {
  // id: PropTypes.string,
  rgbCode: PropTypes.array,
  // likes: PropTypes.number
  // tags: PropTypes.array,
};

export default ColorDetails;
