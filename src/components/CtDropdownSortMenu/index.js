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

// colortown context
// import { useColorTown } from "../../context/colortown";

export default function CtDropdownSortMenu() {
  // const { filterTags, setFilterTags } = useColorTown();
  const [anchorEl, setAnchorEl] = useState(null);
  const [alignment, setAlignment] = useState("left");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const control = {
    value: alignment,
    onChange: handleChange,
    exclusive: true,
  };
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
            {...control}
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
            {...control}
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
