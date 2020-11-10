const createHomePages = require("./create-home-pages");
const createReviewPages = require("./create-review-pages");
const createWatchlistPages = require("./create-watchlist-pages");
const createViewingStatsPages = require("./create-viewing-stats-pages");

module.exports = async function onCreatePages({ graphql, actions, reporter }) {
  const { createPage } = actions;

  await createHomePages(graphql, reporter, createPage);
  await createReviewPages(graphql, reporter, createPage);
  await createWatchlistPages(graphql, reporter, createPage);
  await createViewingStatsPages(graphql, reporter, createPage);
};
