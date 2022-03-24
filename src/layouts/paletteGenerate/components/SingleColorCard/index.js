import { useState } from "react";
// @mui material components
// import IconButton from "@mui/material/IconButton";
// import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// @mui icons
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AlarmIcon from "@mui/icons-material/Alarm";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// borderRadius = "xs";
// variant = "gradient"

function SingleColorCard({ bgColor, handleCopy }) {
  const [show, setShow] = useState(false);
  return (
    <SuiBox
      height="420px"
      display="grid"
      justifyContent="center"
      alignItems="center"
      bgColor={bgColor}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {show && (
        <SuiBox
          borderRadius="lg"
          bgColor="rgb(255,255,255)"
          p={1}
          pb={0}
          sx={{ boxShadow: 1 }}
        >
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <SuiBox onClick={() => handleCopy(bgColor)}>
              <Tooltip title="Copy RGB Code to Clipboard" placement="top">
                <Icon sx={{ cursor: "pointer" }} fontSize="medium">
                  content_copy
                </Icon>
              </Tooltip>
            </SuiBox>
            <SuiBox>
              <Tooltip title="Generete Random (soon)" placement="bottom">
                <Icon sx={{ cursor: "pointer" }} fontSize="medium">
                  autorenew
                </Icon>
              </Tooltip>
            </SuiBox>
          </Grid>
        </SuiBox>
      )}
    </SuiBox>
  );
}

SingleColorCard.defaultProps = {
  bgColor: "transparent",
  handleCopy: function handleCopy() {},
};

// Typechecking props for the SuiBox
SingleColorCard.propTypes = {
  bgColor: PropTypes.string,
  handleCopy: PropTypes.func,
};

export default SingleColorCard;
