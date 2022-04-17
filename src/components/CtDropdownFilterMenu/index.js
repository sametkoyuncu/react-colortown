import { useState } from "react";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

// Soft UI Dashboard React components
import SuiButton from "components/SuiButton";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// tags
import { tags, tagKeys } from "../../data/tags";

function CtDropdownFilterMenu({ filterTags, setFilterTags }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (tagName) => {
    if (!filterTags.includes(tagName)) setFilterTags((prev) => [...prev, tagName]);
    else {
      const newTags = filterTags.filter((item) => item !== tagName);
      setFilterTags([...newTags]);
    }
  };

  return (
    <div>
      <SuiButton
        id="basic-button"
        variant="outlined"
        color="secondary"
        size="small"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ marginTop: "5px" }}
      >
        <Icon>filter_alt</Icon>
        &nbsp;Filter By
      </SuiButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <FormGroup>
          {tagKeys.map((tag) => (
            <MenuItem key={tags[tag]}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    value={tag}
                    sx={{
                      borderColor: tags[tag],
                      backgroundColor: tags[tag],
                      "&.Mui-checked": {
                        color: tags[tag],
                        borderColor: tags[tag],
                        boxShadow: 3,
                      },
                    }}
                    checked={filterTags.includes(tag)}
                    onChange={() => handleChange(tag)}
                  />
                }
                label={tag}
              />
            </MenuItem>
          ))}
        </FormGroup>
      </Menu>
    </div>
  );
}
// Typechecking props for the CtDropdownFilterMenu
CtDropdownFilterMenu.propTypes = {
  filterTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setFilterTags: PropTypes.func.isRequired,
};

export default CtDropdownFilterMenu;
