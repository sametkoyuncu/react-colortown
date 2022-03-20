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

function GradientCard({ bgColor }) {
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setIsLiked(!isLiked);
    // veritabanından çekerken buna gerek kalmaz
    // şimdi beğenince artıyor, beğenmeden çıkınca azalıyor
    if (count > 0) setCount(count - 1);
    else setCount(count + 1);
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
              xs={12}
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid
                xs={6}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <SuiButton variant="transparent" size="medium" circular onClick={handleClick}>
                  {/* , color: "#FC354C" */}
                  <Icon
                    color={isLiked ? "error" : "secondary"}
                    sx={{ fontSize: "24px !important" }}
                  >
                    {isLiked ? "favorite" : "favorite_border"}
                  </Icon>
                  <SuiTypography ml={1} variant="button" fontWeight="light" color="secondary">
                    {count}
                  </SuiTypography>
                </SuiButton>
              </Grid>
              <Grid xs={6} container direction="row" justifyContent="flex-end" alignItems="center">
                <SuiButton variant="outlined" color="secondary" size="small" circular>
                  <SuiTypography ml={1} variant="button" fontWeight="medium" color="secondary">
                    Details
                  </SuiTypography>
                </SuiButton>
              </Grid>
            </Grid>
          </SuiBox>
        </Grid>
      </SuiBox>
    </Card>
  );
}

GradientCard.defaultProps = {
  bgColor: "transparent",
};

// Typechecking props for the SuiBox
GradientCard.propTypes = {
  bgColor: PropTypes.string,
};

export default GradientCard;
