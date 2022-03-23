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
import { useEffect, useState } from "react";

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
import ColorDataCard from "layouts/colorGenerate/components/ColorDataCard";

// color convert functions
import { rgbToHex, rgbToHsl, randomRGBColor } from "functions/color";

function ColorGenerate() {
  const [rgbCode, setRgbCode] = useState([0, 0, 0]);
  const [hexCode, setHexCode] = useState("#000000");
  const [hslCode, setHslCode] = useState("hsl(0,0%,0%)");

  const getRandomRGBColor = () => {
    const newColors = [...randomRGBColor()];
    setRgbCode([...newColors]);
  };

  useEffect(() => {
    // get hex code and update
    const convertedHex = rgbToHex(...rgbCode);
    setHexCode(convertedHex);

    // het hsl code and update
    const convertedHsl = rgbToHsl(...rgbCode);
    setHslCode(convertedHsl);
  }, [rgbCode]);

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

export default ColorGenerate;
