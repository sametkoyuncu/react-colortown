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
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Dashboard layout components
import CtColorPreviewCard from "components/CtColorPreviewCard";
import GradientDataCard from "layouts/gradientGenerate/components/GradientDataCard";

// color convert functions
import { rgbToHex, rgbToHsl, randomRGBColor } from "functions/color";

function GradientGenerate() {
  const [direction, setDirection] = useState("to right");

  const [colorCodes1, setColorCodes1] = useState({
    rgb: "rgb(111, 13, 167)",
    hex: "#6f0da7",
    hsl: "hsl(278, 85%, 35%)",
  });

  const [colorCodes2, setColorCodes2] = useState({
    rgb: "rgb(248, 89, 42)",
    hex: "#f8592a",
    hsl: "hsl(13, 93%, 56%)",
  });

  const getRandomRGBColor = () => {
    const rgbCode1 = [...randomRGBColor()];
    const rgbCode2 = [...randomRGBColor()];

    // get hex code 1
    const convertedHex1 = rgbToHex(...rgbCode1);
    // get hsl code 1
    const convertedHsl1 = rgbToHsl(...rgbCode1);
    setColorCodes1({
      rgb: `rgb(${rgbCode1[0]}, ${rgbCode1[1]}, ${rgbCode1[2]})`,
      hex: convertedHex1,
      hsl: convertedHsl1,
    });

    // get hex code 2
    const convertedHex2 = rgbToHex(...rgbCode2);
    // get hsl code 2
    const convertedHsl2 = rgbToHsl(...rgbCode2);
    setColorCodes2({
      rgb: `rgb(${rgbCode2[0]}, ${rgbCode2[1]}, ${rgbCode2[2]})`,
      hex: convertedHex2,
      hsl: convertedHsl2,
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <CtColorPreviewCard
                bgColor={`linear-gradient(${direction}, ${colorCodes1.hex}, ${colorCodes2.hex})`}
                setDirection={setDirection}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <GradientDataCard
                colorCodes1={colorCodes1}
                colorCodes2={colorCodes2}
                getRandomRGBColor={getRandomRGBColor}
              />
            </Grid>
          </Grid>
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default GradientGenerate;
