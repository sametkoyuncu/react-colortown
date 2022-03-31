/**
=========================================================
* Soft UI Dashboard React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Soft UI Dashboard React Base Styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
// import borders from "assets/theme/base/borders";

// Soft UI Dashboard PRO helper functions
import pxToRem from "assets/theme/functions/pxToRem";
// white, inputColors;
const { dark, grey } = colors;
const { size, fontWeightRegular } = typography;
// const { borderWidth, borderRadius } = borders;

// input base root içinde

//   backgroundColor: `${white.main}`,
//   border: `${borderWidth[1]} solid ${inputColors.borderColor.main}`,
//             borderRadius: borderRadius.md,

const inputBase = {
  styleOverrides: {
    root: {
      display: "grid !important",
      placeItems: "center !important",
      width: "100% !important",
      height: "auto !important",
      fontSize: `${size.sm}`,
      fontWeight: `${fontWeightRegular}`,
      lineHeight: "1.4",
      padding: `${pxToRem(8)} ${pxToRem(12)}`,
      color: `${grey[700]}`,
      backgroundClip: "padding-box !important",
      appearance: "none !important",
      transition: "box-shadow 150ms ease, border-color 150ms ease, padding 150ms ease !important",
    },

    input: {
      width: "100% !important",
      height: `${pxToRem(22)}`,
      padding: "0 !important",

      "&::-webkit-input-placeholder": {
        color: `${dark.main} !important`,
      },
    },
  },
};

export default inputBase;
