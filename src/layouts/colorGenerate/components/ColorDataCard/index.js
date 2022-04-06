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

function ColorDataCard({ colorCodes, getRandomRGBColor }) {
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

  const { borderWidth, borderColor } = borders;

  const codeSectionData = [
    {
      logo: hexLogo,
      code: colorCodes.hex,
    },
    {
      logo: rgbLogo,
      code: colorCodes.rgb,
    },
    {
      logo: hslLogo,
      code: colorCodes.hsl,
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
    <Card id="color-generate">
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
        <CtSaveModal colorCodes={colorCodes} type="color" />
      </SuiBox>
      {/* buttons end */}
      <SuiBox p={2}>
        <Grid container spacing={2}>
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
  colorCodes: {
    rgb: `rgb(0, 0, 0)`,
    hex: "#000000",
    hsl: "hsl(0,0%,0%)",
  },
  getRandomRGBColor: function handleLikeBtnClick() {},
};

// Typechecking props for the SuiBox
ColorDataCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  colorCodes: PropTypes.object,
  getRandomRGBColor: PropTypes.func,
};

export default ColorDataCard;
