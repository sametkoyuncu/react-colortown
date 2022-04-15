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
import { useParams } from "react-router-dom";
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
import { doc, getDoc } from "firebase/firestore";
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
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedTab, setSelectedTab] = useState(true);
  const { ctColors, setCtColors, ctGradients, setCtGradients, ctPalettes, setCtPalettes } =
    useColorTown();

  const resetData = () => {
    setData([]);
    setFavorites([]);
  };

  const fetchColection = (collectionName) => {
    // type must be "first" or "next"
    getCollectionByUserId(db, collectionName, id)
      .then((res) => {
        setData((prev) => [...prev, ...res]);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const fetchFavorites = (firebaseDb, userId) => {
    // type must be "first" or "next"
    getFavoritesByUserId(firebaseDb, userId)
      .then((res) => {
        setFavorites([...res]);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  // collections and favorites together
  const fetchAllData = () => {
    setIsLoading(true);

    fetchColection("colors");
    fetchColection("gradients");
    fetchColection("palettes");

    fetchFavorites(db, id);

    setIsLoading(false);
  };
  // TODO: favori ve koleksiyon her tab değiştiğinde güncellenebilir veya favoriler için favorilerden çıkarınca da olsa iyi olur
  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUser({ id: docSnap.id, ...docSnap.data() });
        setIsLoading(false);
      } else {
        // TODO: do something
        console.log("No such document!");
      }
      console.log(user);
    };

    // çok da iyi değil
    try {
      resetData();
    } finally {
      fetchUser();
      fetchAllData();
    }
  }, [id]);

  // tab changer
  const handleTabChange = (value) => {
    setIsLoading(true);
    setSelectedTab(value);
    setIsLoading(false);
  };

  // FIXME: burasına güzel bir ayar çekilecek (favorilere ekle)
  const handleLikeBtnClickColor = async (colorId, reqType) => {
    if (reqType === "add") {
      if (user) await addToFavorites(db, id, "color", colorId);
      await incrementLikes(db, "color", colorId);
      setCtColors([...ctColors, colorId]);
    } else if (reqType === "remove") {
      if (user) await removeFromFavorites(db, id, "color", colorId);
      await decrementLikes(db, "color", colorId);
      const newColors = ctColors.filter((_id) => _id !== colorId);
      setCtColors([...newColors]);
    }
  };

  const handleLikeBtnClickGradient = async (gradientId, reqType) => {
    if (reqType === "add") {
      if (user) await addToFavorites(db, id, "gradient", gradientId);
      await incrementLikes(db, "gradient", gradientId);
      setCtGradients([...ctGradients, gradientId]);
    } else if (reqType === "remove") {
      if (user) await removeFromFavorites(db, id, "gradient", gradientId);
      await decrementLikes(db, "gradient", gradientId);
      const newGradients = ctGradients.filter((_id) => _id !== gradientId);
      setCtGradients([...newGradients]);
    }
  };

  const handleLikeBtnClickPalette = async (paletteId, reqType) => {
    if (reqType === "add") {
      if (user) await addToFavorites(db, id, "palette", paletteId);
      await incrementLikes(db, "palette", paletteId);
      setCtPalettes([...ctPalettes, paletteId]);
    } else if (reqType === "remove") {
      if (user) await removeFromFavorites(db, id, "palette", paletteId);
      await decrementLikes(db, "palette", paletteId);
      const newPalettes = ctPalettes.filter((_id) => _id !== paletteId);
      setCtPalettes([...newPalettes]);
    }
  };

  return (
    <DashboardLayout>
      <Header
        profileImage={user.photoURL}
        displayName={user.displayName}
        email={user.email}
        setSelectedTab={handleTabChange}
        isFavoritesShow={id === currentUser.uid}
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
