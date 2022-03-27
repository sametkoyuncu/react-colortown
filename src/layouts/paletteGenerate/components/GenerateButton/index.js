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

function GenerateButton({ getRandomHSLColors }) {
  return (
    <SuiBox pt={2} px={2} display="flex" justifyContent="center" alignItems="center">
      <SuiButton variant="gradient" color="dark" onClick={getRandomHSLColors}>
        <Icon sx={{ fontWeight: "bold" }}>cached</Icon>
        &nbsp;generate random
      </SuiButton>
    </SuiBox>
  );
}

GenerateButton.defaultProps = {
  getRandomHSLColors: function getRandomHSLColors() {},
};

// Typechecking props for the SuiBox
GenerateButton.propTypes = {
  getRandomHSLColors: PropTypes.func,
};

export default GenerateButton;
