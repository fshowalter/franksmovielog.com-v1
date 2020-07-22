/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import littlefoot from "littlefoot";
import "littlefoot/dist/littlefoot.css";

// eslint-disable-next-line import/prefer-default-export
export function onRouteUpdate() {
  littlefoot(); // Pass any littlefoot settings here.
}
