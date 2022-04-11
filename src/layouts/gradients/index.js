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
import CircularProgress from "@mui/material/CircularProgress";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Dashboard layout components
import GradientCard from "layouts/gradients/components/GradientCard";

// firebase
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../firebase";

// functions
import usePagination from "../../services/Pagination";

// colortown context
import { useColorTown } from "../../context/colortown";

function Gradients() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  // if the last data has been loaded, the 'load more' button must be disabled
  const [isLastDataLoaded, setIsLastDataLoaded] = useState(false);
  const { ctGradients, setCtGradients } = useColorTown();

  const fetchData = (collectionName, type) => {
    // type must be "first" or "next"
    setIsLoading(true);

    usePagination(collectionName, type)
      .then((res) => {
        setData((prev) => [...prev, ...res]);
        setIsLoading(false);
        if (res.length < 8) setIsLastDataLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // get first 8 docs from colors collection
    fetchData("gradients", "first");
  }, []);

  const handleLikeBtnClick = async (gradientId, reqType) => {
    const dataRef = doc(db, "gradients", gradientId);
    if (reqType === "add") {
      await updateDoc(dataRef, {
        likes: increment(1),
      });
      setCtGradients([...ctGradients, gradientId]);
    } else if (reqType === "remove") {
      await updateDoc(dataRef, {
        likes: increment(-1),
      });
      const newGradients = ctGradients.filter((id) => id !== gradientId);
      setCtGradients([...newGradients]);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          {isLoading && data.length === 0 && (
            <SuiBox mb={3} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CircularProgress color="info" />
            </SuiBox>
          )}
          <Grid container spacing={2}>
            {data.map((gradient) => (
              <Grid key={gradient.id} item xs={12} sm={6} md={3}>
                <GradientCard
                  gradientId={gradient.id}
                  bgColor={`linear-gradient(${gradient.direction}, ${gradient.colors[0].hex}, ${gradient.colors[1].hex})`}
                  likesCount={gradient.likes}
                  isLiked={ctGradients.indexOf(gradient.id) >= 0}
                  handleLikeBtnClick={handleLikeBtnClick}
                />
              </Grid>
            ))}
          </Grid>
          {data.length === 0 ||
            (!isLastDataLoaded && (
              <SuiBox
                mt={2}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <SuiButton
                  variant="gradient"
                  color="info"
                  onClick={() => fetchData("gradients", "next")}
                >
                  More Gradients
                </SuiButton>
              </SuiBox>
            ))}
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Gradients;
