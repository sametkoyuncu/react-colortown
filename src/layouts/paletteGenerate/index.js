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
import { getRandomPalette } from "functions/color";

// Dashboard layout components
import SingleColorCard from "layouts/paletteGenerate/components/SingleColorCard";
import GenerateButton from "./components/GenerateButton";

const INITIAL_STATE = [
  {
    color: "#f5ffbe",
    name: "Australian Mint",
  },
  {
    color: "#414257",
    name: "Gun Powder",
  },
  {
    color: "#f0fcea",
    name: "Feta",
  },
  {
    color: "#ffd700",
    name: "Golden",
  },
  {
    color: "#fef0ec",
    name: "Bridesmaid",
  },
];

function PaletteGenerate() {
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [colorCodes, setColorCodes] = useState([...INITIAL_STATE]);

  const handleCopy = (copyText) => {
    setIsSnackBarOpen(true);
    navigator.clipboard.writeText(copyText);
  };

  const handleClose = () => {
    setIsSnackBarOpen(false);
  };

  const getRandomHSLColors = () => {
    const arr = getRandomPalette() || [];
    setColorCodes([...arr]);
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
                    flexDirection: { xs: "column", sm: "row" },
                    flexWrap: "nowrap",
                    alignItems: "stretch",
                  }}
                >
                  {colorCodes.map(
                    (item, index) =>
                      index < 4 && (
                        <SingleColorCard
                          key={item.color}
                          bgColor={item.color}
                          bgName={item.name}
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