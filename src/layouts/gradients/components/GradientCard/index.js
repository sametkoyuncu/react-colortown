import { useState } from "react";
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// borderRadius = "xs";
// variant = "gradient"

function GradientCard({ gradientId, bgColor, likesCount, isLiked, handleLikeBtnClick }) {
  const [count, setCount] = useState(likesCount);

  const handleClick = () => {
    // veritabanından çekerken buna gerek kalmaz
    // şimdi beğenince artıyor, beğenmeden çıkınca azalıyor
    if (isLiked) setCount(count - 1);
    else setCount(count + 1);

    // context işlemleri
    const reqType = isLiked ? "remove" : "add";
    handleLikeBtnClick(gradientId, reqType);
  };

  return (
    <Card>
      <SuiBox p={1}>
        <Grid item xs={12} sx={{ position: "relative", m: "auto" }}>
          <SuiBox
            height="160px"
            display="grid"
            justifyContent="center"
            alignItems="center"
            bgColor={bgColor}
            borderRadius="lg"
          />
          {/* ALT KISIM */}
          <SuiBox mr={2} mt={1}>
            <Grid
              item
              xs={12}
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid
                item
                xs={6}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <IconButton aria-label="delete" onClick={handleClick} sx={{ marginLeft: "5px" }}>
                  {isLiked ? <Favorite sx={{ color: "#FC354C" }} /> : <FavoriteBorder />}
                </IconButton>
                <SuiTypography variant="button" fontWeight="light" color="secondary">
                  {count}
                </SuiTypography>
              </Grid>
              <Grid
                item
                xs={6}
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Link to={`/gradients/${gradientId}`}>
                  <SuiButton variant="outlined" color="secondary" size="small" circular>
                    <SuiTypography ml={1} variant="button" fontWeight="medium" color="secondary">
                      Details
                    </SuiTypography>
                  </SuiButton>
                </Link>
              </Grid>
            </Grid>
          </SuiBox>
        </Grid>
      </SuiBox>
    </Card>
  );
}

GradientCard.defaultProps = {
  gradientId: null,
  bgColor: "transparent",
  likesCount: 0,
  isLiked: false,
  handleLikeBtnClick: function handleLikeBtnClick() {},
};

// Typechecking props for the SuiBox
GradientCard.propTypes = {
  gradientId: PropTypes.string,
  bgColor: PropTypes.string,
  likesCount: PropTypes.number,
  isLiked: PropTypes.bool,
  handleLikeBtnClick: PropTypes.func,
};

export default GradientCard;
