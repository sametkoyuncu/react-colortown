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
import ColorCard from "layouts/colors/components/ColorCard";

// data
import colors from "../../data/colors";

// colortown context
import { useColorTown } from "../../context/colortown";

function Colors() {
  const { ctColors, setCtColors } = useColorTown();

  const handleLikeBtnClick = (colorId, reqType) => {
    if (reqType === "add") setCtColors([...ctColors, colorId]);
    else if (reqType === "remove") {
      const newColors = ctColors.filter((id) => id !== colorId);
      setCtColors([...newColors]);
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Grid container spacing={2}>
            {colors.map((color) => (
              <Grid key={color.id} item xs={12} sm={6} md={3}>
                <ColorCard
                  colorId={color.id}
                  bgColor={color.hexCode}
                  likesCount={color.likes}
                  isLiked={ctColors.indexOf(color.id) >= 0}
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

export default Colors;
