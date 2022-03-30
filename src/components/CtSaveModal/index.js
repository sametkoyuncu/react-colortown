import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SuiButton from "components/SuiButton";

export default function CtSaveModal() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <SuiButton variant="gradient" color="info" onClick={handleClickOpen}>
        <Icon>save</Icon>
        &nbsp;save
      </SuiButton>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
        <DialogTitle>Save this color</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Color Name"
            type="text"
            fullWidth="xs"
            variant="standard"
            sx={{
              border: "none !important",
              backgroundColor: "rgba(0,0,0,0) !important",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
