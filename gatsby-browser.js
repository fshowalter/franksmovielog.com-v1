/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
const { littlefoot } = require("littlefoot");
require("littlefoot/dist/littlefoot.css");

exports.onRouteUpdate = ({ location, prevLocation }) => {
  if (location.pathname != (prevLocation && prevLocation.pathname)) {
    littlefoot(); // Pass any littlefoot settings here.
  }
};
