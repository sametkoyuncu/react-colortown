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
import { db } from "../../firebase";

// functions
import {
  getCollectionByUserId,
  getFavoritesByUserId,
  addToFavorites,
  removeFromFavorites,
  incrementLikes,
  decrementLikes,
} from "../../services";

function Overview() {
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedTab, setSelectedTab] = useState(true);
  const { ctColors, setCtColors, ctGradients, setCtGradients, ctPalettes, setCtPalettes } =
    useColorTown();

  const fetchColection = async (collectionName) => {
    // type must be "first" or "next"
    await getCollectionByUserId(db, collectionName, currentUser.uid)
      .then((res) => {
        setData((prev) => [...prev, ...res]);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const fetchFavorites = async (firebaseDb, userId) => {
    // type must be "first" or "next"
    await getFavoritesByUserId(firebaseDb, userId)
      .then((res) => {
        setFavorites((prev) => [...prev, ...res]);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const fetchAllData = async () => {
    setIsLoading(true);

    await fetchColection("colors");
    await fetchColection("gradients");
    await fetchColection("palettes");

    await fetchFavorites(db, currentUser.uid);

    setIsLoading(false);
  };
  // TODO: favori ve koleksiyon her tab değiştiğinde güncellenebilir veya favoriler için favorilerden çıkarınca da olsa iyi olur
  useEffect(() => {
    fetchAllData();
  }, []);

  // tab changer
  const handleTabChange = (value) => {
    setIsLoading(true);
    setSelectedTab(value);
    setIsLoading(false);
  };

  // FIXME: burasına güzel bir ayar çekilecek (favorilere ekle)
  const handleLikeBtnClickColor = async (colorId, reqType) => {
    if (reqType === "add") {
      if (currentUser) await addToFavorites(db, currentUser.uid, "color", colorId);
      await incrementLikes(db, "color", colorId);
      setCtColors([...ctColors, colorId]);
    } else if (reqType === "remove") {
      if (currentUser) await removeFromFavorites(db, currentUser.uid, "color", colorId);
      await decrementLikes(db, "color", colorId);
      const newColors = ctColors.filter((id) => id !== colorId);
      setCtColors([...newColors]);
    }
  };

  const handleLikeBtnClickGradient = async (gradientId, reqType) => {
    if (reqType === "add") {
      if (currentUser) await addToFavorites(db, currentUser.uid, "gradient", gradientId);
      await incrementLikes(db, "gradient", gradientId);
      setCtGradients([...ctGradients, gradientId]);
    } else if (reqType === "remove") {
      if (currentUser) await removeFromFavorites(db, currentUser.uid, "gradient", gradientId);
      await decrementLikes(db, "gradient", gradientId);
      const newGradients = ctGradients.filter((id) => id !== gradientId);
      setCtGradients([...newGradients]);
    }
  };

  const handleLikeBtnClickPalette = async (paletteId, reqType) => {
    if (reqType === "add") {
      if (currentUser) await addToFavorites(db, currentUser.uid, "palette", paletteId);
      await incrementLikes(db, "palette", paletteId);
      setCtPalettes([...ctPalettes, paletteId]);
    } else if (reqType === "remove") {
      if (currentUser) await removeFromFavorites(db, currentUser.uid, "palette", paletteId);
      await decrementLikes(db, "palette", paletteId);
      const newPalettes = ctPalettes.filter((id) => id !== paletteId);
      setCtPalettes([...newPalettes]);
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
          {!selectedTab && (
            <Grid container spacing={2}>
              {favorites.map((item) => (
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
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
