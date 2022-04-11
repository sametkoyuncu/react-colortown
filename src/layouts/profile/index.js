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
import { useState, useContext, useEffect } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// context
import { AuthContext } from "context/colortown/AuthContext";
import { useColorTown } from "context/colortown";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";

// Dashboard layout components
import ColorCard from "layouts/colors/components/ColorCard";
import GradientCard from "layouts/gradients/components/GradientCard";
import PaletteCard from "layouts/palettes/components/PaletteCard";

// Overview page components
import Header from "layouts/profile/components/Header";

// firebase
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../firebase";

// functions
// import usePagination from "../../services/Pagination";
import getByUserId from "../../services/GetByUserId";

function Overview() {
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedTab, setSelectedTab] = useState(true);
  const { ctColors, setCtColors, ctGradients, setCtGradients, ctPalettes, setCtPalettes } =
    useColorTown();

  const fetchData = async (collectionName) => {
    // type must be "first" or "next"
    await getByUserId(db, collectionName, currentUser.uid)
      .then((res) => {
        setData((prev) => [...prev, ...res]);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const fetchAllData = async () => {
    setIsLoading(true);

    await fetchData("colors");
    await fetchData("gradients");
    await fetchData("palettes");

    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // tab changer
  const handleTabChange = (value) => {
    setIsLoading(true);
    setSelectedTab(value);
    setIsLoading(false);
  };

  // burasına güzel bir ayar çekilecek (favorilere ekle)
  const handleLikeBtnClickColor = async (colorId, reqType) => {
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

  const handleLikeBtnClickGradient = async (gradientId, reqType) => {
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
      const newColors = ctGradients.filter((id) => id !== gradientId);
      setCtGradients([...newColors]);
    }
  };

  const handleLikeBtnClickPalette = async (paletteId, reqType) => {
    const dataRef = doc(db, "palettes", paletteId);
    if (reqType === "add") {
      await updateDoc(dataRef, {
        likes: increment(1),
      });
      setCtPalettes([...ctPalettes, paletteId]);
    } else if (reqType === "remove") {
      await updateDoc(dataRef, {
        likes: increment(-1),
      });
      const newColors = ctPalettes.filter((id) => id !== paletteId);
      setCtPalettes([...newColors]);
    }
  };

  return (
    <DashboardLayout>
      <Header
        profileImage={currentUser.photoURL}
        displayName={currentUser.displayName}
        email={currentUser.email}
        setSelectedTab={handleTabChange}
      />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          {isLoading && data.length === 0 && (
            <SuiBox mb={3} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CircularProgress color="info" />
            </SuiBox>
          )}
          {selectedTab && (
            <Grid container spacing={2}>
              {data.map((item) => (
                <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                  {item.type === "color" && (
                    <ColorCard
                      colorId={item.id}
                      bgColor={item.rgb}
                      likesCount={item.likes}
                      isLiked={ctColors.indexOf(item.id) >= 0}
                      handleLikeBtnClick={handleLikeBtnClickColor}
                    />
                  )}
                  {item.type === "gradient" && (
                    <GradientCard
                      gradientId={item.id}
                      bgColor={`linear-gradient(${item.direction}, ${item.colors[0].hex}, ${item.colors[1].hex})`}
                      likesCount={item.likes}
                      isLiked={ctGradients.indexOf(item.id) >= 0}
                      handleLikeBtnClick={handleLikeBtnClickGradient}
                    />
                  )}
                  {item.type === "palette" && (
                    <PaletteCard
                      paletteId={item.id}
                      bgColors={[...item.colors]}
                      likesCount={item.likes}
                      isLiked={ctPalettes.indexOf(item.id) >= 0}
                      handleLikeBtnClick={handleLikeBtnClickPalette}
                    />
                  )}
                </Grid>
              ))}
            </Grid>
          )}
          {!selectedTab && "favorites"}
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
