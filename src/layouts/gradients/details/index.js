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
  const [gradient, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "gradients", id);
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
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
                    bgColor={`linear-gradient(${gradient.direction}, ${gradient.colors[0].hex}, ${gradient.colors[1].hex})`}
                  />
                </Grid>
                {!!gradient.tags.length && (
                  <Grid item xs={12} mt={1}>
                    <CtColorTagsCard tags={gradient.tags} />
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12} sm={7}>
                <GradientDetailCard
                  colorCodes1={gradient.colors[0]}
                  colorCodes2={gradient.colors[1]}
                />
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
