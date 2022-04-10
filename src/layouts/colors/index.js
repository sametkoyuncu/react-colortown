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
import ColorCard from "layouts/colors/components/ColorCard";

// firebase
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../firebase";

//
import usePagination from "../../services/Pagination";

// colortown context
import { useColorTown } from "../../context/colortown";

function Colors() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isLastDataLoaded, setIsLastDataLoaded] = useState(false);
  const { ctColors, setCtColors } = useColorTown();

  const fetchData = (collectionName, type) => {
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
    fetchData("colors", "first");
  }, []);

  const handleLikeBtnClick = async (colorId, reqType) => {
    const dataRef = doc(db, "colors", colorId);
    if (reqType === "add") {
      await updateDoc(dataRef, {
        likes: increment(1),
      });
      setCtColors([...ctColors, colorId]);
    } else if (reqType === "remove") {
      await updateDoc(dataRef, {
        likes: increment(-1),
      });
      const newColors = ctColors.filter((id) => id !== colorId);
      setCtColors([...newColors]);
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
            {data.map((color) => (
              <Grid key={color.id} item xs={12} sm={6} md={3}>
                <ColorCard
                  colorId={color.id}
                  bgColor={color.rgb}
                  likesCount={color.likes}
                  isLiked={ctColors.indexOf(color.id) >= 0}
                  handleLikeBtnClick={handleLikeBtnClick}
                />
              </Grid>
            ))}
          </Grid>
          <SuiBox mt={2} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* TODO: loading button eklenebilir */}
            <SuiButton
              variant="gradient"
              color="info"
              disabled={isLastDataLoaded}
              onClick={() => fetchData("colors", "next")}
            >
              {!isLastDataLoaded ? "More Colors" : "No More Colors"}
            </SuiButton>
          </SuiBox>
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Colors;
