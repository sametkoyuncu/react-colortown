// @mui material components
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

function CtSnackBar({ message, type, isSnackBarOpen, handleClose, autoHideDuration }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={isSnackBarOpen}
      onClose={handleClose}
      autoHideDuration={autoHideDuration}
      action={
        <IconButton aria-label="close" color="inherit" sx={{ p: 0.5 }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      }
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

CtSnackBar.defaultProps = {
  type: "success",
  autoHideDuration: 2500,
  handleClose: function handleLikeBtnClick() {},
};

// Typechecking props for the SuiBox
CtSnackBar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
  autoHideDuration: PropTypes.number,
  isSnackBarOpen: PropTypes.bool.isRequired,
  handleClose: function handleLikeBtnClick() {},
};
export default CtSnackBar;
