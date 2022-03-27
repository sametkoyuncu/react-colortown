import { useState } from "react";
// @mui material components
// import IconButton from "@mui/material/IconButton";
// import Stack from "@mui/material/Stack";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// @mui icons
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AlarmIcon from "@mui/icons-material/Alarm";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// borderRadius = "xs";
// variant = "gradient"

function SingleColorCard({ bgColor, bgName, handleCopy }) {
  const [show, setShow] = useState(false);
  return (
    <SuiBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgColor={bgColor}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      sx={{
        position: "relative",
        justifyContent: { xs: "flex-end", sm: "center" },
        height: { xs: "18vh", sm: "70vh" },
        width: { xs: "100%", sm: "25%" },
        px: 2,
      }}
    >
      {show && (
        <>
          <SuiTypography
            variant="subtitle2"
            align="center"
            maxWidth="100%"
            sx={{
              position: {
                sm: "absolute",
              },
              bottom: {
                sm: "20px",
              },
              ml: {
                sm: "auto",
              },
              mr: {
                xs: "10px",
              },
              px: 1,
              background: "rgba(255,255,255)",
              borderRadius: "5px",
              boxShadow: "rgba(0, 0, 0, 0.1) -4px 9px 25px -6px",
            }}
          >
            {bgName}
          </SuiTypography>
          <SuiBox
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgColor="rgb(255,255,255)"
            p={1}
            sx={{
              flexDirection: "column",
              boxShadow: "rgba(0, 0, 0, 0.1) -4px 9px 25px -6px",
            }}
          >
            <SuiBox display="flex" onClick={() => handleCopy(bgColor)}>
              <Tooltip title="Copy HEX Code to Clipboard" placement="top">
                <Icon sx={{ cursor: "pointer" }} fontSize="small">
                  content_copy
                </Icon>
              </Tooltip>
            </SuiBox>
            {/* <SuiBox display="flex">
              <Tooltip title="Generete Random (soon)" placement="bottom">
                <Icon sx={{ cursor: "pointer" }} fontSize="small">
                  autorenew
                </Icon>
              </Tooltip>
            </SuiBox> */}
          </SuiBox>
        </>
      )}
    </SuiBox>
  );
}

SingleColorCard.defaultProps = {
  bgName: "null",
  bgColor: "transparent",
  handleCopy: function handleCopy() {},
};

// Typechecking props for the SuiBox
SingleColorCard.propTypes = {
  bgName: PropTypes.string,
  bgColor: PropTypes.string,
  handleCopy: PropTypes.func,
};

export default SingleColorCard;
