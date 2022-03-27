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

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Dashboard layout components
import PaletteCard from "layouts/palettes/components/PaletteCard";

// data
import palettes from "../../data/palettes";

// colortown context
import { useColorTown } from "../../context/colortown";

function Palettes() {
  const { ctPalettes, setCtPalettes } = useColorTown();

  const handleLikeBtnClick = (paletteId, reqType) => {
    if (reqType === "add") setCtPalettes([...ctPalettes, paletteId]);
    else if (reqType === "remove") {
      const newPalettes = ctPalettes.filter((id) => id !== paletteId);
      setCtPalettes([...newPalettes]);
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Grid container spacing={2}>
            {palettes.map((palette) => (
              <Grid key={palette.id} item xs={12} sm={6} md={3}>
                <PaletteCard
                  paletteId={palette.id}
                  bgColors={[...palette.colors]}
                  likesCount={palette.likes}
                  isLiked={ctPalettes.indexOf(palette.id) >= 0}
                  handleLikeBtnClick={handleLikeBtnClick}
                />
              </Grid>
            ))}
          </Grid>
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Palettes;
