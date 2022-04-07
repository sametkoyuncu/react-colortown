import { useState } from "react";

// @mui material components
import Icon from "@mui/material/Icon";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// Soft UI Dashboard React components
import SuiButton from "components/SuiButton";

function CtDisabledSaveButton() {
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

  const handleOpen = () => {
    setIsSnackBarOpen(true);
  };

  const handleClose = () => {
    setIsSnackBarOpen(false);
  };

  return (
    <>
      <SuiButton variant="gradient" color="info" onClick={handleOpen}>
        <Icon>save</Icon>
        &nbsp;save
      </SuiButton>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isSnackBarOpen}
        onClose={handleClose}
        autoHideDuration={2500}
        action={
          <IconButton aria-label="close" color="inherit" sx={{ p: 0.5 }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        }
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Please sign in your account!
        </Alert>
      </Snackbar>
    </>
  );
}

export default CtDisabledSaveButton;
