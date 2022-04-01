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
import Icon from "@mui/material/Icon";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "@mui/material/Slider";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// Soft UI Dashboard React base styles
import borders from "assets/theme/base/borders";

// ct components
import CtColorCodeSection from "components/CtColorCodeSection";
import CtSaveModal from "components/CtSaveModal";

// Images
import hexLogo from "assets/images/logos/hex.png";
import rgbLogo from "assets/images/logos/rgb.png";
import hslLogo from "assets/images/logos/hsl.png";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

function GradientDataCard({
  colorCodes1,
  colorCodes2,
  getRandomRGBColor,
  direction,
  setDirection,
}) {
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  // const [direction, setDirection] = useState(180);

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

  // snackbar functions
  const handleCopy = (copyText) => {
    setIsSnackBarOpen(true);
    navigator.clipboard.writeText(copyText);
  };

  const handleClose = () => {
    setIsSnackBarOpen(false);
  };

  // slider functions
  const handleChangeDirection = (event, newValue) => {
    setDirection(newValue);
  };

  return (
    <Card>
      {/* buttons */}
      <SuiBox
        p={2}
        pb={0}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <SuiButton variant="gradient" color="dark" onClick={getRandomRGBColor}>
          <Icon sx={{ fontWeight: "bold" }}>cached</Icon>
          &nbsp;generate random
        </SuiButton>
        <CtSaveModal colorCodes={[colorCodes1, colorCodes2]} type="gradient" />
      </SuiBox>
      {/* buttons end */}
      <SuiBox p={2}>
        <Grid container spacing={0}>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <SuiTypography variant="caption1" ml={1} mr={3}>
              Direction:
            </SuiTypography>
            <Slider
              display="flex"
              value={direction}
              aria-label="Direction"
              min={0}
              max={360}
              onChange={handleChangeDirection}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} md={6} container spacing={2}>
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
          <Grid item xs={12} md={6} container spacing={2}>
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

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isSnackBarOpen}
        onClose={handleClose}
        autoHideDuration={2500}
        action={
          <IconButton aria-label="close" color="inherit" sx={{ p: 0.5 }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        }
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Copied to Clipboard! 👍
        </Alert>
      </Snackbar>
    </Card>
  );
}

GradientDataCard.defaultProps = {
  colorCodes1: {
    rgb1: `rgb(0, 0, 0)`,
    hex1: "#000000",
    hsl1: "hsl(0,0%,0%)",
  },
  colorCodes2: {
    rgb2: `rgb(0, 0, 0)`,
    hex2: "#000000",
    hsl2: "hsl(0,0%,0%)",
  },
  getRandomRGBColor: function handleLikeBtnClick() {},
};

// Typechecking props for the SuiBox
GradientDataCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  colorCodes1: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  colorCodes2: PropTypes.object,
  getRandomRGBColor: PropTypes.func,
  direction: PropTypes.number.isRequired,
  setDirection: PropTypes.func.isRequired,
};

export default GradientDataCard;
