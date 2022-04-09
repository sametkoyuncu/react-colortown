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
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

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

// firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";

function PaletteDetails() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "palettes", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData({ id: docSnap.id, ...docSnap.data() });
        setIsLoading(false);
      } else {
        // TODO: do something
        console.log("No such document!");
      }
    };
    fetchData();
  }, [id]);

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
            {isLoading && (
              <SuiBox sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress color="info" />
              </SuiBox>
            )}
            {!isLoading && (
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
                    {data.colors.map(
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
            )}
          </SuiBox>
          <CtSnackBar
            message="Copied to Clipboard! 👍"
            isSnackBarOpen={isSnackBarOpen}
            handleClose={handleClose}
          />
        </Card>
      </SuiBox>
      {!isLoading && !!data.tags.length && (
        <Grid item xs={12} mb={2}>
          <CtColorTagsCard tags={data.tags} />
        </Grid>
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default PaletteDetails;
