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
import ColorDetailCard from "layouts/colors/details/components/ColorDetailCard";

// firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";

function ColorDetails() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "colors", id);
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
                  <CtColorPreviewCard bgColor={data.rgb} />
                </Grid>
                {!!data.tags.length && (
                  <Grid item xs={12} mt={1}>
                    <CtColorTagsCard tags={data.tags} />
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12} sm={7}>
                <ColorDetailCard hexCode={data.hex} rgbCode={data.rgb} hslCode={data.hsl} />
              </Grid>
            </Grid>
          )}
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ColorDetails;
