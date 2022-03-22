import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// borderRadius = "xs";
// variant = "gradient"

function PaletteCard({ paletteId, bgColors, likesCount, isLiked, handleLikeBtnClick }) {
  const [count, setCount] = useState(likesCount);

  const handleClick = () => {
    // veritabanından çekerken buna gerek kalmaz
    // şimdi beğenince artıyor, beğenmeden çıkınca azalıyor
    if (isLiked) setCount(count - 1);
    else setCount(count + 1);

    // context işlemleri
    const reqType = isLiked ? "remove" : "add";
    handleLikeBtnClick(paletteId, reqType);
  };

  return (
    <Card>
      <SuiBox p={1}>
        <Grid container spacing={0}>
          {bgColors.map((bgColor) => (
            <Grid key={bgColor} item xs={3} sx={{ position: "relative", ml: "auto" }}>
              <SuiBox
                height="160px"
                display="grid"
                justifyContent="center"
                alignItems="center"
                bgColor={bgColor}
              />
            </Grid>
          ))}
        </Grid>
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
              <SuiButton size="medium" circular onClick={handleClick}>
                {/* , color: "#FC354C" */}
                <Icon color={isLiked ? "error" : "secondary"} sx={{ fontSize: "24px !important" }}>
                  {isLiked ? "favorite" : "favorite_border"}
                </Icon>
                <SuiTypography ml={1} variant="button" fontWeight="light" color="secondary">
                  {count}
                </SuiTypography>
              </SuiButton>
            </Grid>
            <Grid
              item
              xs={6}
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <SuiButton variant="outlined" color="secondary" size="small" circular>
                <SuiTypography ml={1} variant="button" fontWeight="medium" color="secondary">
                  Details
                </SuiTypography>
              </SuiButton>
            </Grid>
          </Grid>
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

PaletteCard.defaultProps = {
  paletteId: null,
  bgColors: ["transparent"],
  likesCount: 0,
  isLiked: false,
  handleLikeBtnClick: function handleLikeBtnClick() {},
};

// Typechecking props for the SuiBox
PaletteCard.propTypes = {
  paletteId: PropTypes.string,
  bgColors: PropTypes.arrayOf(PropTypes.string),
  likesCount: PropTypes.number,
  isLiked: PropTypes.bool,
  handleLikeBtnClick: PropTypes.func,
};

export default PaletteCard;
