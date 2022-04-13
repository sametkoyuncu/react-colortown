// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// tags label and colors
import { tags as tagsLabelAndColors } from "../../data/tags";

//
import Tag from "./tag";

function ColorTagsCard({ tags }) {
  return (
    <Card sx={{ height: "100%", padding: "0.75rem", paddingBottom: "0" }}>
      <SuiBox display="flex" alignItems="center" justifyContent="center" flexWrap="wrap">
        {tags.map((tag) => (
          <Tag bgColor={tagsLabelAndColors[tag]} label={tag} key={tagsLabelAndColors[tag]} />
        ))}
      </SuiBox>
    </Card>
  );
}

ColorTagsCard.defaultProps = {
  tags: [
    {
      color: "",
      label: "",
    },
  ],
};

// Typechecking props for the SuiBox
ColorTagsCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  tags: PropTypes.array,
};

export default ColorTagsCard;
