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

function ColorDetailCard({ hexCode, rgbCode, hslCode }) {
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

  const { borderWidth, borderColor } = borders;

  const codeSectionData = [
    {
      logo: hexLogo,
      code: hexCode,
    },
    {
      logo: rgbLogo,
      code: rgbCode,
    },
    {
      logo: hslLogo,
      code: hslCode,
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
          {codeSectionData.map((item) => (
            <CtColorCodeSection
              key={Math.random() * 1000}
              borderWidth={borderWidth[1]}
              borderColor={borderColor}
              logo={item.logo}
              code={item.code}
              handleCopy={handleCopy}
            />
          ))}
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

ColorDetailCard.defaultProps = {
  hexCode: "#fffff",
  rgbCode: "rgb(255,255,255)",
  hslCode: "hsl(0, 100%,100%)",
};

// Typechecking props for the SuiBox
ColorDetailCard.propTypes = {
  hexCode: PropTypes.string,
  rgbCode: PropTypes.string,
  hslCode: PropTypes.string,
};

export default ColorDetailCard;
