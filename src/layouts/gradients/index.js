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
import GradientCard from "layouts/gradients/components/GradientCard";

// firebase
import { collection, getDocs, doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../firebase";

// colortown context
import { useColorTown } from "../../context/colortown";

function Gradients() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const { ctGradients, setCtGradients } = useColorTown();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const list = [];
        const querySnapshot = await getDocs(collection(db, "gradients"));
        querySnapshot.forEach((document) => {
          list.push({ id: document.id, ...document.data() });
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
          {isLoading && (
            <SuiBox sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Gradients;
