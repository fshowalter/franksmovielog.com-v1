<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://www.franksmovielog.com">
    <img alt="Frank's Movie Log" src="https://www.franksmovielog.com/assets/default_og.jpg" width="500" />
  </a>
</p>
<h1 align="center">
  Frank's Movie Log
</h1>

Source for www.franksmovielog.com. Built on [Gatsby](https://www.gatsbyjs.org/).

## Setup

1.  **Install nvm.**

    See [the instructions at the NVM repo](https://github.com/nvm-sh/nvm#installing-and-updating).

1.  **Intialize your Node env.**

    An .nvmrc is included in the project.

    ```shell
    # use the .nvmrc version of Node.
    nvm use
    ```

1.  **Install yarn.**

    Yarn is our package-manger of choice.

    ```shell
    # enable yarn via corepack
    corepack enable
    ```

1.  **Start a Dev server.**

    Running the task through yarn will also pass the necessary parameters to
    allow external access to the site.

    ```shell
    # start Gatsby develop.
    yarn develop
    ```

1.  **Open the source code and start editing!**

    The site is now running at `http://localhost:8001` with a GraphQL instance at `http://localhost:8001/___graphql`.

## What's inside?

A quick look at the non-standard directories included in the project.

    .
    ├── content
    ├── src/images
    ├── src/styles
    └── src/utils

1.  **`/content`**: The movie log content. Reviews and data copied from the backend system, as well as front-end
    specific assets like backdrops and posters. It also contains the content for the [about](https://www.franksmovielog.com/about/) and [how I grade](https://www.franksmovielog.com/how-i-grade/) pages.

1.  **`/src/images`**: The favicon images used by the `gatsby-manifest` plugin to generate the necessary `meta` tags.

1.  **`/src/styles`**: Shared SASS variables and mixins.

1.  **`/src/utils`**: Shared utility functions.

## Deployment

Push to Github and Netlify takes it from there.
