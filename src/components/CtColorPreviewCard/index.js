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

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

function CtColorPreviewCard({ bgColor }) {
  return (
    <Card
      sx={{
        height: "100%",
        padding: "0.75rem",
        position: "sticky",
        zIndex: 50,
        top: 100,
      }}
    >
      <SuiBox
        bgColor={bgColor}
        borderRadius="lg"
        sx={{
          height: "100%",
          minHeight: "240px",
        }}
      />
    </Card>
  );
}

CtColorPreviewCard.defaultProps = {
  bgColor: "transparent",
};

// Typechecking props for the SuiBox
CtColorPreviewCard.propTypes = {
  bgColor: PropTypes.string,
};

export default CtColorPreviewCard;
