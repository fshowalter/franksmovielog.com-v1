const createHomePages = require("./create-home-pages");
const createReviewPages = require("./create-review-pages");
const createWatchlistPages = require("./create-watchlist-pages");
const createStatPages = require("./create-stat-pages");

module.exports = async function onCreatePages({ graphql, actions, reporter }) {
  const { createPage } = actions;

  await createHomePages(graphql, reporter, createPage);
  await createReviewPages(graphql, reporter, createPage);
  await createWatchlistPages(graphql, reporter, createPage);
  await createStatPages(graphql, reporter, createPage);
};
