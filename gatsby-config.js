module.exports = {
  siteMetadata: {
    title: `Henry J. Webster`,
    description: `My personal website.`,
    author: `@henrywebster`,
    url: `https://hwebs.info`,
    released: false,
    copyright: `2021 Henry J. Webster`,
    version: `0.1.0`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`, // Needed for dynamic images
    "gatsby-transformer-json",
    `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/src/data/`,
      },
      // resolve: `gatsby-source-filesystem`,
      // options: {
      //   name: `images`,
      //   path: `${__dirname}/src/images/`,
      // },
    },
  ],
}
