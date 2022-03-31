import { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Icon from "@mui/material/Icon";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SuiButton from "components/SuiButton";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// data
import tags from "../../data/tags";

function CtSaveModal({ colorCodes }) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  // modal functions
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // checkbox functions
  const handleChangeChecbox = (tagIndex) => {
    let newTags;
    // listede varsa çıkar, yoksa ekle
    if (selectedTags.includes(tags[tagIndex]))
      newTags = selectedTags.filter((item) => item.label !== tags[tagIndex].label);
    else newTags = [...selectedTags, tags[tagIndex]];
    setSelectedTags([...newTags]);
  };

  // save color
  const handleSave = () => {
    const random = Math.floor(1000 + Math.random() * 90000);
    const id = `color_${random}`;
    const color = {
      id,
      name,
      hex: colorCodes.hex,
      rgb: colorCodes.rgb,
      hsl: colorCodes.hsl,
      likes: 0,
      tags: [...selectedTags],
    };

    setOpen(false);
    // clear states
    setName("");
    setSelectedTags([]);
    console.log(color);
  };

  return (
    <div>
      <SuiButton variant="gradient" color="info" onClick={handleClickOpen}>
        <Icon>save</Icon>
        &nbsp;save
      </SuiButton>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
        <DialogTitle>Save this color</DialogTitle>
        <DialogContent>
          {/* name input */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            color="info"
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* chechboxes */}
          <DialogContentText sx={{ marginTop: "20px", marginBottom: "5px" }}>
            Tags:
          </DialogContentText>
          <FormGroup
            display="flex"
            sx={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            {tags.map((tag, index) => (
              <FormControlLabel
                key={tag.label}
                control={
                  <Checkbox
                    onChange={() => handleChangeChecbox(index)}
                    sx={{
                      backgroundImage: "none !important",
                      color: `${tag.color} !important`,
                      "&.Mui-checked": {
                        backgroundColor: tag.color,
                        color: tag.color,
                        borderColor: tag.color,
                      },
                    }}
                  />
                }
                label={tag.label}
                sx={{
                  display: "inline-flex",
                  padding: "5px",
                  color: "#757575",
                }}
              />
            ))}
          </FormGroup>
          {/* chechboxes end */}
        </DialogContent>
        <DialogActions>
          <SuiButton
            onClick={handleClose}
            p={5}
            sx={{
              boxShadow: 0,
              color: "#FC4F4F",
              "&:hover": { color: "#fff", backgroundColor: "#FC4F4F" },
            }}
          >
            Cancel
          </SuiButton>
          <SuiButton variant="gradient" color="info" onClick={handleSave}>
            <Icon>save</Icon>
            &nbsp;save
          </SuiButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CtSaveModal.defaultProps = {
  colorCodes: {
    rgb: `rgb(0, 0, 0)`,
    hex: "#000000",
    hsl: "hsl(0,0%,0%)",
  },
};

// Typechecking props for the SuiBox
CtSaveModal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  colorCodes: PropTypes.object,
};

export default CtSaveModal;
