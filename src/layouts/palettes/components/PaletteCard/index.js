import React from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// borderRadius = "xs";
// variant = "gradient"

function PaletteCard({ bgColors }) {
  return (
    <Card>
      <SuiBox p={2} height="200px">
        <Grid container spacing={0}>
          {bgColors.map((bgColor) => (
            <Grid item xs={3} sx={{ position: "relative", ml: "auto" }}>
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
      </SuiBox>
    </Card>
  );
}

PaletteCard.defaultProps = {
  bgColors: ["transparent"],
};

// Typechecking props for the SuiBox
PaletteCard.propTypes = {
  bgColors: PropTypes.arrayOf(PropTypes.string),
};

export default PaletteCard;
