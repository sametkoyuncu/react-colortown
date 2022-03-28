import Box from "@mui/material/Box";
// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

function Tag({ bgColor, label }) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" mr={1} mb={1}>
      <SuiBox
        bgColor={bgColor}
        width="1.25rem"
        height="1.25rem"
        borderRadius="md"
        shadow="md"
        mr={0.5}
      />
      <SuiTypography variant="caption" textTransform="capitalize" fontWeight="medium" color="text">
        {label}
      </SuiTypography>
    </Box>
  );
}

Tag.defaultProps = {
  bgColor: "transparent",
  label: "Blue",
};

// Typechecking props for the SuiBox
Tag.propTypes = {
  bgColor: PropTypes.string,
  label: PropTypes.string,
};

export default Tag;
