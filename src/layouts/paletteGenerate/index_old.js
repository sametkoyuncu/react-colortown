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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";

// @mui material icons
import CloseIcon from "@mui/icons-material/Close";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// color convert functions + rgbToHex, rgbToHsl,
import { randomRGBColor } from "functions/color";

// Dashboard layout components
import SingleColorCard from "layouts/paletteGenerate/components/SingleColorCard";
import GenerateButton from "./components/GenerateButton";

function PaletteGenerate() {
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [colorCodes, setColorCodes] = useState([
    { rgb: [10, 50, 90] },
    { rgb: [20, 60, 100] },
    { rgb: [30, 70, 110] },
    { rgb: [40, 80, 120] },
  ]);

  const handleCopy = (copyText) => {
    setIsSnackBarOpen(true);
    navigator.clipboard.writeText(copyText);
  };

  const handleClose = () => {
    setIsSnackBarOpen(false);
  };

  const getRandomRGBColors = () => {
    const randomColorsTemp = [];

    for (let i = 0; i < 4; i += 1) {
      randomColorsTemp.push([...randomRGBColor()]);
    }

    const randomColorsTempMap = randomColorsTemp.map((item) => ({ rgb: [...item] }));

    setColorCodes([...randomColorsTempMap]);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox mb={3}>
        <Card>
          <SuiBox p={2}>
            <Grid container spacing={0}>
              {colorCodes.map(
                (color, index) =>
                  index < 4 && (
                    <Grid key={color.rgb[index] - Math.random()} item xs={3}>
                      <SingleColorCard
                        bgColor={`rgb(${color.rgb[0]},${color.rgb[1]},${color.rgb[2]})`}
                        handleCopy={handleCopy}
                      />
                    </Grid>
                  )
              )}
              <Grid item xs={12}>
                <GenerateButton getRandomRGBColors={getRandomRGBColors} />
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
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default PaletteGenerate;
