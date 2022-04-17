import { useState } from "react";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// Soft UI Dashboard React components
import SuiButton from "components/SuiButton";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

function CtDropdownSortMenu({ sort, setSort }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [alignmentSortField, setAlignmentSortField] = useState("left");
  const [alignmentSortType, setAlignmentSortType] = useState("left");

  const handleChangeSortField = (event, newAlignment) => {
    setAlignmentSortField(newAlignment);
    // eslint-disable-next-line no-unused-expressions
    newAlignment === "left"
      ? setSort({ field: "timeStamp", type: sort.type })
      : setSort({ field: "likes", type: sort.type });
  };

  const handleChangeSortType = (event, newAlignment) => {
    setAlignmentSortType(newAlignment);
    // eslint-disable-next-line no-unused-expressions
    newAlignment === "left"
      ? setSort({ field: sort.field, type: "asc" })
      : setSort({ field: sort.field, type: "desc" });
  };

  const controlSortField = {
    value: alignmentSortField,
    onChange: handleChangeSortField,
    exclusive: true,
  };

  const controlSortType = {
    value: alignmentSortType,
    onChange: handleChangeSortType,
    exclusive: true,
  };
  // dropdown
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleChange = (tagName) => {
  //   if (!filterTags.includes(tagName)) setFilterTags((prev) => [...prev, tagName]);
  //   else {
  //     const newTags = filterTags.filter((item) => item !== tagName);
  //     setFilterTags([...newTags]);
  //   }
  // };

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
        sx={{ marginTop: "5px", marginRight: "5px" }}
      >
        <Icon>sort</Icon>
        &nbsp;Sort By
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
        <MenuItem
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ToggleButtonGroup
            size="small"
            {...controlSortField}
            sx={{ marginTop: "4px", marginRight: "5px" }}
          >
            <ToggleButton value="left" key="left">
              Date
            </ToggleButton>
            <ToggleButton value="right" key="right">
              Likes
            </ToggleButton>
          </ToggleButtonGroup>
        </MenuItem>
        <MenuItem
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ToggleButtonGroup
            size="small"
            {...controlSortType}
            sx={{ marginTop: "4px", marginRight: "5px" }}
          >
            <ToggleButton value="left" key="left">
              <ArrowDropUpIcon />
              &nbsp;ASC
            </ToggleButton>
            <ToggleButton value="right" key="right">
              <ArrowDropDownIcon />
              &nbsp;DESC
            </ToggleButton>
          </ToggleButtonGroup>
        </MenuItem>
      </Menu>
    </div>
  );
}

// Typechecking props for the CtDropdownFilterMenu
CtDropdownSortMenu.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  sort: PropTypes.object.isRequired,
  setSort: PropTypes.func.isRequired,
};

export default CtDropdownSortMenu;
