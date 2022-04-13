import { useState, useContext } from "react";

// @mui components
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
import Icon from "@mui/material/Icon";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LoadingButton from "@mui/lab/LoadingButton";

// Soft UI Dashboard React components
import SuiButton from "components/SuiButton";

// Ct Components
import CtSnackBar from "components/CtSnackBar";

// context
import { AuthContext } from "context/colortown/AuthContext";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// firestore
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

// data
import { tags, tagKeys } from "../../data/tags";

function CtSaveModal({ colorCodes, type }) {
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  // modal functions
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // clear states
    setName("");
    setSelectedTags([]);
  };

  const handleSnackbarClose = () => {
    setIsSnackBarOpen(false);
  };

  // checkbox functions
  const handleChangeChecbox = (tagIndex) => {
    let newTags;
    // listede varsa çıkar, yoksa ekle
    if (selectedTags.includes(tagKeys[tagIndex]))
      newTags = selectedTags.filter((item) => item !== tagKeys[tagIndex]);
    else newTags = [...selectedTags, tagKeys[tagIndex]];
    setSelectedTags([...newTags]);
  };
  // TODO: işlem sonucuna göre snackbar göster
  // save functions
  const saveColor = async () => {
    try {
      await addDoc(collection(db, "colors"), {
        name,
        hex: colorCodes.hex,
        rgb: colorCodes.rgb,
        hsl: colorCodes.hsl,
        likes: 0,
        tags: [...selectedTags],

        timeStamp: serverTimestamp(),
        userId: currentUser.uid,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const saveGradient = async () => {
    try {
      await addDoc(collection(db, "gradients"), {
        name,
        colors: [
          { hex: colorCodes[0].hex, rgb: colorCodes[0].rgb, hsl: colorCodes[0].hsl },
          { hex: colorCodes[1].hex, rgb: colorCodes[1].rgb, hsl: colorCodes[1].hsl },
        ],
        direction: `${colorCodes[2]}deg`,
        likes: 0,
        tags: [...selectedTags],
        type: "gradient",
        timeStamp: serverTimestamp(),
        userId: currentUser.uid,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const savePalette = async () => {
    try {
      await addDoc(collection(db, "palettes"), {
        name,
        colors: [...colorCodes],
        likes: 0,
        tags: [...selectedTags],
        type: "palette",
        timeStamp: serverTimestamp(),
        userId: currentUser.uid,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    // istek nereden geliyorsa ona göre kaydeliyor
    // istek color, gradient veya palatte generator sayfalarıdan birisinden gelmeli
    switch (type) {
      case "color":
        await saveColor();
        break;
      case "gradient":
        await saveGradient();
        break;
      case "palette":
        await savePalette();
        break;
      default:
        break;
    }
    //
    setIsLoading(false);
    // close modal
    setOpen(false);
    // open snackbar
    setIsSnackBarOpen(true);
    // clear states
    setName("");
    setSelectedTags([]);
  };

  return (
    <>
      {/* open modal button */}
      <SuiButton variant="gradient" color="info" onClick={handleClickOpen}>
        <Icon>save</Icon>
        &nbsp;save
      </SuiButton>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
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
          {/* chechboxes start */}
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
            {tagKeys.map((tag, index) => (
              <FormControlLabel
                key={tags[tag]}
                control={
                  <Checkbox
                    onChange={() => handleChangeChecbox(index)}
                    sx={{
                      backgroundImage: "none !important",
                      color: `${tags[tag]} !important`,
                      "&.Mui-checked": {
                        backgroundColor: tags[tag],
                        color: tags[tag],
                        borderColor: tags[tag],
                        boxShadow: 3,
                      },
                    }}
                  />
                }
                label={tag}
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
          <LoadingButton
            disabled={name === "" || !selectedTags.length}
            variant="contained"
            onClick={handleSave}
            loadingPosition="start"
            startIcon={<Icon>save</Icon>}
            loading={isLoading}
            sx={{ color: "white !important" }}
          >
            &nbsp;save
          </LoadingButton>
          {/* <SuiButton
            disabled={name === "" || !selectedTags.length}
            variant="gradient"
            color="info"
            onClick={handleSave}
          >
            <Icon>save</Icon>
            &nbsp;save
          </SuiButton> */}
        </DialogActions>
      </Dialog>
      <CtSnackBar
        message="Saved successfully! 👍"
        isSnackBarOpen={isSnackBarOpen}
        handleClose={handleSnackbarClose}
      />
    </>
  );
}

// Typechecking props for the SuiBox
CtSaveModal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  colorCodes: PropTypes.any.isRequired,
  type: PropTypes.oneOf(["color", "gradient", "palette"]).isRequired,
};

export default CtSaveModal;
