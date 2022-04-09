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

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Dashboard layout components
import ColorCard from "layouts/colors/components/ColorCard";

// firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

// colortown context
import { useColorTown } from "../../context/colortown";

function Colors() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const { ctColors, setCtColors } = useColorTown();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const list = [];
        const querySnapshot = await getDocs(collection(db, "colors"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        setIsLoading(false);
      } catch (err) {
        // TODO: düzgün bir şey ayarla
        console.log(err);
      }
    };
    fetchData();
  }, []);

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
          {isLoading && (
            <SuiBox sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Colors;
