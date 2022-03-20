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

function GradientCard({ bgColor }) {
  return (
    <Card>
      <SuiBox p={2} height="200px">
        <Grid item xs={12} sx={{ position: "relative", m: "auto" }}>
          <SuiBox
            height="160px"
            display="grid"
            justifyContent="center"
            alignItems="center"
            bgColor={bgColor}
          />
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
