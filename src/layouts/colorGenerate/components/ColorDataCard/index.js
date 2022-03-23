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

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// Soft UI Dashboard React base styles
import borders from "assets/theme/base/borders";

import CtColorCodeSection from "components/CtColorCodeSection";

// Images
import hexLogo from "assets/images/logos/hex.png";
import rgbLogo from "assets/images/logos/rgb.png";
import hslLogo from "assets/images/logos/hsl.png";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

function ColorDataCard({ hexCode, rgbCode, hslCode, getRandomRGBColor }) {
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
    <Card id="delete-account">
      <SuiBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <SuiTypography variant="h6" fontWeight="medium">
          Color Codes
        </SuiTypography>
        <SuiButton variant="gradient" color="dark" onClick={getRandomRGBColor}>
          <Icon sx={{ fontWeight: "bold" }}>cached</Icon>
          &nbsp;generate random
        </SuiButton>
      </SuiBox>
      <SuiBox p={2}>
        <Grid container spacing={3}>
          {codeSectionData.map((item) => (
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

ColorDataCard.defaultProps = {
  hexCode: "",
  rgbCode: "",
  hslCode: "",
  getRandomRGBColor: function handleLikeBtnClick() {},
};

// Typechecking props for the SuiBox
ColorDataCard.propTypes = {
  hexCode: PropTypes.string,
  rgbCode: PropTypes.string,
  hslCode: PropTypes.string,
  getRandomRGBColor: PropTypes.func,
};

export default ColorDataCard;
