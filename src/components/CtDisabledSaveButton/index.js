import { useState } from "react";

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SuiButton from "components/SuiButton";

// Ct Components
import CtSnackBar from "components/CtSnackBar";

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
      <CtSnackBar
        message="Please sign in your account!"
        type="error"
        isSnackBarOpen={isSnackBarOpen}
        handleClose={handleClose}
      />
    </>
  );
}

export default CtDisabledSaveButton;
