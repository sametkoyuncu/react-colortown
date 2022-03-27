/**
=========================================================
* Soft UI Dashboard React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";

function Basket({ color, size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 42 42"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>basket</title>
      <g id="Basic-Elements" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="Rounded-Icons"
          transform="translate(-1869.000000, -741.000000)"
          fill={colors[color] ? colors[color].main : colors.dark.main}
          fillRule="nonzero"
        >
          <g id="Icons-with-opacity" transform="translate(1716.000000, 291.000000)">
            <g id="basket" transform="translate(153.000000, 450.000000)">
              <path
                className="color-background"
                xmlns="http://www.w3.org/2000/svg"
                d="M5470 12794 c-288 -24 -479 -52 -695 -100 -800 -178 -1568 -578 -2275 -1182 -177 -151 -523 -499 -682 -684 -390 -457 -711 -939 -986 -1481 -946 -1863 -1095 -4073 -392 -5827 81 -203 257 -559 362 -735 422 -704 961 -1242 1613 -1611 111 -62 1411 -686 1731 -830 805 -361 1674 -439 2581 -228 1132 262 2221 986 3066 2039 183 227 249 339 312 528 61 184 86 399 66 567 -32 257 -116 445 -271 600 -67 67 -104 95 -175 132 -89 45 -1413 675 -1490 708 -160 69 -383 66 -569 -9 -185 -74 -305 -174 -501 -416 -608 -753 -1345 -1216 -2155 -1354 -187 -32 -423 -45 -591 -32 l-144 11 -112 115 c-416 428 -722 1053 -847 1735 -73 399 -89 897 -41 1311 156 1364 883 2623 1920 3325 575 389 1244 587 1843 544 l142 -10 70 -59 c90 -75 75 -68 925 -471 515 -244 743 -348 800 -362 115 -30 296 -22 410 16 329 112 597 398 720 769 49 148 66 245 72 397 6 159 -11 285 -58 425 -72 215 -167 333 -475 590 -214 177 -450 336 -684 458 -211 111 -1679 802 -1826 860 -300 119 -624 200 -974 242 -127 16 -584 28 -690 19z"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

// Setting default values for the props of Basket
Basket.defaultProps = {
  color: "dark",
  size: "16px",
};

// Typechecking props for the Basket
Basket.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
    "white",
  ]),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Basket;
