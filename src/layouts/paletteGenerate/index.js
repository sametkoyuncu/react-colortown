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
import { useState, useContext } from "react";
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// ct components
import CtSaveModal from "components/CtSaveModal";
import CtDisabledSaveButton from "components/CtDisabledSaveButton";
import CtSnackBar from "components/CtSnackBar";

// context
import { AuthContext } from "context/colortown/AuthContext";

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
];

function PaletteGenerate() {
  const { currentUser } = useContext(AuthContext);

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [colorCodes, setColorCodes] = useState([...INITIAL_STATE]);

  const handleCopy = (copyText) => {
    setIsSnackBarOpen(true);
    navigator.clipboard.writeText(copyText);
  };

  const handleClose = () => {
    setIsSnackBarOpen(false);
  };
  // TODO: this function name must be change
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
              <Grid item xs={12} mb={2}>
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
                <SuiBox
                  pt={0}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <GenerateButton getRandomHSLColors={getRandomHSLColors} />
                  {/* kullanıcı oturum açmışsa kayıt modal'ını göster  */}
                  {/* oturum açmamışsa uyarı veren butonu göster */}
                  {currentUser !== null ? (
                    <CtSaveModal colorCodes={colorCodes} type="palette" />
                  ) : (
                    <CtDisabledSaveButton />
                  )}
                </SuiBox>
              </Grid>
            </Grid>
          </SuiBox>
          <CtSnackBar
            message="Copied to Clipboard! 👍"
            isSnackBarOpen={isSnackBarOpen}
            handleClose={handleClose}
          />
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default PaletteGenerate;
