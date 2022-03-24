import React from "react";

// @mui material components
// import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
// import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

function GenerateButton({ getRandomRGBColors }) {
  return (
    <SuiBox pt={2} px={2} display="flex" justifyContent="center" alignItems="center">
      {/* <SuiTypography variant="h6" fontWeight="medium">
        Color Codes
      </SuiTypography> */}
      <SuiButton variant="gradient" color="dark" onClick={getRandomRGBColors}>
        <Icon sx={{ fontWeight: "bold" }}>cached</Icon>
        &nbsp;generate random
      </SuiButton>
    </SuiBox>
  );
}

GenerateButton.defaultProps = {
  getRandomRGBColors: function getRandomRGBColors() {},
};

// Typechecking props for the SuiBox
GenerateButton.propTypes = {
  getRandomRGBColors: PropTypes.func,
};

export default GenerateButton;
