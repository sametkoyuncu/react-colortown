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
import { useParams } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Dashboard layout components
import SingleColorCard from "layouts/palettes/details/components/SingleColorCard";

// colortown components
import CtColorTagsCard from "components/CtColorTagsCard";
import CtSnackBar from "components/CtSnackBar";

// data
import palettes from "../../../data/palettes";

function PaletteDetails() {
  const { id } = useParams();
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

  const INITIAL_STATE = {
    id: "palette_0",
    colors: [
      {
        color: "#ffffff",
        name: "White",
      },
      {
        color: "#fffffe",
        name: "White",
      },
      {
        color: "#fffffd",
        name: "White",
      },
      {
        color: "#fffffc",
        name: "White",
      },
    ],
    likes: 0,
    tags: [],
  };

  // TODO: INITIAL_STATE yerine 404 olmalı
  const palette = palettes.find((item) => item.id === id) || INITIAL_STATE;

  const handleCopy = (copyText) => {
    setIsSnackBarOpen(true);
    navigator.clipboard.writeText(copyText);
  };

  const handleClose = () => {
    setIsSnackBarOpen(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox mb={2}>
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
                  {palette.colors.map(
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
            </Grid>
          </SuiBox>
          <CtSnackBar
            message="Copied to Clipboard! 👍"
            isSnackBarOpen={isSnackBarOpen}
            handleClose={handleClose}
          />
        </Card>
      </SuiBox>
      {!!palette.tags.length && (
        <Grid item xs={12} mb={2}>
          <CtColorTagsCard tags={palette.tags} />
        </Grid>
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default PaletteDetails;
