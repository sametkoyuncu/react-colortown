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

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React base styles
import borders from "assets/theme/base/borders";

// Ct Components
import CtColorCodeSection from "components/CtColorCodeSection";
import CtSnackBar from "components/CtSnackBar";

// Images
import hexLogo from "assets/images/logos/hex.png";
import rgbLogo from "assets/images/logos/rgb.png";
import hslLogo from "assets/images/logos/hsl.png";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

function GradientDetailCard({ colorCodes1, colorCodes2 }) {
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

  const { borderWidth, borderColor } = borders;

  const codeSectionData1 = [
    {
      logo: hexLogo,
      code: colorCodes1.hex,
    },
    {
      logo: rgbLogo,
      code: colorCodes1.rgb,
    },
    {
      logo: hslLogo,
      code: colorCodes1.hsl,
    },
  ];

  const codeSectionData2 = [
    {
      logo: hexLogo,
      code: colorCodes2.hex,
    },
    {
      logo: rgbLogo,
      code: colorCodes2.rgb,
    },
    {
      logo: hslLogo,
      code: colorCodes2.hsl,
    },
  ];

  const handleCopy = (copyText) => {
    setIsSnackBarOpen(true);
    navigator.clipboard.writeText(copyText);
  };

  const handleClose = () => {
    setIsSnackBarOpen(false);
  };

  return (
    <Card>
      <SuiBox p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} container spacing={3}>
            <SuiTypography variant="body1" ml={4} mt={2} sx={{ color: colorCodes1.hex }}>
              Color 1
            </SuiTypography>
            {codeSectionData1.map((item) => (
              <CtColorCodeSection
                key={item.code}
                borderWidth={borderWidth[1]}
                borderColor={borderColor}
                logo={item.logo}
                code={item.code}
                handleCopy={handleCopy}
              />
            ))}
          </Grid>
          <Grid item xs={12} md={6} container spacing={3}>
            <SuiTypography variant="body1" ml={4} mt={2} sx={{ color: colorCodes2.hex }}>
              Color 2
            </SuiTypography>
            {codeSectionData2.map((item) => (
              <CtColorCodeSection
                key={item.code}
                borderWidth={borderWidth[1]}
                borderColor={borderColor}
                logo={item.logo}
                code={item.code}
                handleCopy={handleCopy}
              />
            ))}
          </Grid>
        </Grid>
      </SuiBox>
      <CtSnackBar
        message="Copied to Clipboard! 👍"
        isSnackBarOpen={isSnackBarOpen}
        handleClose={handleClose}
      />
    </Card>
  );
}

GradientDetailCard.defaultProps = {
  colorCodes1: {
    rgb: `rgb(0, 0, 0)`,
    hex: "#000000",
    hsl: "hsl(0,0%,0%)",
  },
  colorCodes2: {
    rgb: `rgb(0, 0, 0)`,
    hex: "#000000",
    hsl: "hsl(0,0%,0%)",
  },
};

// Typechecking props for the SuiBox
GradientDetailCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  colorCodes1: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  colorCodes2: PropTypes.object,
};

export default GradientDetailCard;
