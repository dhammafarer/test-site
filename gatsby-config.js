const path = require("path");

module.exports = {
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "test-site",
        short_name: "test-site",
        start_url: "/",
        background_color: "#336699",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "./src/images/logos/logo.png", // This path is relative to the root of the site.
      },
    },
    "gatsby-plugin-offline",
    {
      resolve: `gatsby-plugin-polyfill-io`,
      options: {
        features: [
          "Number.isInteger",
          "Object.entries",
          "Set",
          "String.prototype.startsWith",
          "Array.prototype.findIndex",
          "Array.prototype.includes",
        ],
      },
    },
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/images/`,
        name: "images",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-root-import",
    "gatsby-plugin-styled-components",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: [
        {
          resolve: "gatsby-remark-relative-images-v2",
        },
        {
          resolve: "gatsby-remark-images",
          options: {
            maxWidth: 590,
          },
        },
      ],
    },
  ],
};
