import React from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

function CtColorCodeSection({ borderWidth, borderColor, logo, code, handleCopy }) {
  return (
    <Grid item xs={12}>
      <SuiBox
        border={`${borderWidth} solid ${borderColor}`}
        borderRadius="lg"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        <SuiBox component="img" src={logo} alt="master card" width="10%" mr={2} />
        <SuiTypography variant="h6" fontWeight="medium">
          {code}
        </SuiTypography>
        <SuiBox ml="auto" lineHeight={0} onClick={() => handleCopy(code)}>
          <Tooltip title="Copy to Clipboard" placement="top">
            <Icon sx={{ cursor: "pointer" }} fontSize="small">
              content_copy
            </Icon>
          </Tooltip>
        </SuiBox>
      </SuiBox>
    </Grid>
  );
}
// borderWidth, borderColor, logo, code, handleCopy;
CtColorCodeSection.defaultProps = {
  borderWidth: 0,
  borderColor: "",
  logo: "",
  code: "",
  handleCopy: function handleCopy() {},
};

// Typechecking props for the SuiBox
CtColorCodeSection.propTypes = {
  borderWidth: PropTypes.string,
  borderColor: PropTypes.string,
  logo: PropTypes.string,
  code: PropTypes.string,
  handleCopy: PropTypes.func,
};

export default CtColorCodeSection;
