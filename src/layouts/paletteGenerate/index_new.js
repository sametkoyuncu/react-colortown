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
import { randomHSLColor } from "functions/color";

// Dashboard layout components
import SingleColorCard from "layouts/paletteGenerate/components/SingleColorCard";
import GenerateButton from "./components/GenerateButton";

function PaletteGenerate() {
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [colorCodes, setColorCodes] = useState([
    { hsl: [10, 90, 50] },
    { hsl: [20, 90, 50] },
    { hsl: [30, 90, 50] },
    { hsl: [180, 90, 50] },
    { hsl: [200, 90, 50] },
  ]);

  const handleCopy = (copyText) => {
    setIsSnackBarOpen(true);
    navigator.clipboard.writeText(copyText);
  };

  const handleClose = () => {
    setIsSnackBarOpen(false);
  };

  const getRandomHSLColors = () => {
    const randomHSLColorTemp = [...randomHSLColor()];
    // we use for generate and store palette codes
    const paletteColors = [];

    for (let i = 0; i < 3; i += 1) {
      paletteColors.push([
        randomHSLColorTemp[0] + i * 10,
        randomHSLColorTemp[1],
        randomHSLColorTemp[2],
      ]);
    }
    for (let i = 0; i < 2; i += 1) {
      paletteColors.push([
        randomHSLColorTemp[0] + i * 20 + 170,
        randomHSLColorTemp[1],
        randomHSLColorTemp[2],
      ]);
    }
    // if first number is bigger than 360, we need subtrac 360 from it, because max value is 360 degree.
    const paletteColorsMap = paletteColors.map((item) =>
      item[0] <= 360 ? { hsl: [...item] } : { hsl: [item[0] - 360, item[1], item[2]] }
    );

    setColorCodes([...paletteColorsMap]);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox mb={3}>
        <Card>
          <SuiBox p={2}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <SuiBox
                  display="flex"
                  sx={{
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    alignItems: "stretch",
                  }}
                >
                  {colorCodes.map(
                    (color, index) =>
                      index < 5 && (
                        <SingleColorCard
                          bgColor={`hsl(${color.hsl[0]},${color.hsl[1]}%,${color.hsl[2]}%)`}
                          handleCopy={handleCopy}
                        />
                      )
                  )}
                </SuiBox>
              </Grid>
              <Grid item xs={12}>
                <GenerateButton getRandomHSLColors={getRandomHSLColors} />
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
