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
import { useEffect, useState, useContext } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Icon from "@mui/material/Icon";
import LoadingButton from "@mui/lab/LoadingButton";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Dashboard layout components
import PaletteCard from "layouts/palettes/components/PaletteCard";

// firebase
import { db } from "../../firebase";

// functions
import {
  usePagination,
  addToFavorites,
  removeFromFavorites,
  incrementLikes,
  decrementLikes,
} from "../../services";

// colortown context
import { useColorTown } from "../../context/colortown";
import { AuthContext } from "../../context/colortown/AuthContext";

function Palettes() {
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  // if the last data has been loaded, the 'load more' button must be disabled
  const [isLastDataLoaded, setIsLastDataLoaded] = useState(false);
  const { ctPalettes, setCtPalettes } = useColorTown();

  const fetchData = (collectionName, type) => {
    // type must be "first" or "next"
    setIsLoading(true);

    usePagination(collectionName, type)
      .then((res) => {
        setData((prev) => [...prev, ...res]);
        // If we have only 12 docs in database, litte issue here. Because we don't have next docs but load button still visible.
        if (res.length < 12) setIsLastDataLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    // get first 8 docs from colors collection
    fetchData("palettes", "first");
  }, []);

  const handleLikeBtnClick = async (paletteId, reqType) => {
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
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          {isLoading && data.length === 0 && (
            <SuiBox mb={3} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CircularProgress color="info" />
            </SuiBox>
          )}
          <Grid container spacing={2}>
            {data.map((palette) => (
              <Grid key={palette.id} item xs={12} sm={6} md={4} lg={3}>
                <PaletteCard
                  paletteId={palette.id}
                  bgColors={[...palette.colors]}
                  likesCount={palette.likes}
                  isLiked={ctPalettes.indexOf(palette.id) >= 0}
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
                <LoadingButton
                  variant="contained"
                  color="info"
                  onClick={() => fetchData("palettes", "next")}
                  loadingPosition="start"
                  startIcon={<Icon>more_horiz</Icon>}
                  loading={isLoading}
                >
                  &nbsp;More Palettes
                </LoadingButton>
              </SuiBox>
            ))}
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Palettes;
