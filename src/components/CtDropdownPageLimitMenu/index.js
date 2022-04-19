import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const limits = [12, 24, 36, 48, 60];

function CtDropdownPageLimitMenu({ currentLimit, setLimit }) {
  const handleChange = (event) => {
    setLimit(event.target.value);
  };

  return (
    <FormControl variant="filled" sx={{ m: 1 }}>
      <Select
        value={currentLimit}
        color="info"
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        {limits.map((limit) => (
          <MenuItem key={limit} value={limit} sx={{ maxWidth: "25px" }}>
            {limit}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
// Typechecking props for the CtDropdownPageLimitMenu
CtDropdownPageLimitMenu.propTypes = {
  currentLimit: PropTypes.number.isRequired,
  setLimit: PropTypes.func.isRequired,
};

export default CtDropdownPageLimitMenu;
