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
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// ColorTown layout components
import CtColorPreviewCard from "components/CtColorPreviewCard";
import CtColorTagsCard from "components/CtColorTagsCard";
import GradientDetailCard from "layouts/gradients/details/components/GradientDetailCard";

// firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";

function GradientDetails() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "gradients", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData({ id: docSnap.id, ...docSnap.data() });
        setIsLoading(false);
      } else {
        // FIXME: it's not working, why?
        setIsLoading(false);
        setError(true);
        // TODO: do something
        console.log("No such document!");
      }
    };
    fetchData();
  }, [id]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          {error && <p>404: No such document!</p>}
          {isLoading && (
            <SuiBox sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CircularProgress color="info" />
            </SuiBox>
          )}
          {!isLoading && (
            <Grid container spacing={2}>
              <Grid item container xs={12} sm={5}>
                <Grid item xs={12}>
                  <CtColorPreviewCard
                    bgColor={`linear-gradient(${data.direction}, ${data.colors[0].hex}, ${data.colors[1].hex})`}
                  />
                </Grid>
                {!!data.tags.length && (
                  <Grid item xs={12} mt={1}>
                    <CtColorTagsCard tags={data.tags} />
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12} sm={7}>
                <GradientDetailCard colorCodes1={data.colors[0]} colorCodes2={data.colors[1]} />
              </Grid>
            </Grid>
          )}
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default GradientDetails;
