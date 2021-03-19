module.exports = {
  siteMetadata: {
    title: `Henry J. Webster`,
    description: `My personal website.`,
    author: `@henrywebster`,
  },
  plugins: [
    "gatsby-transformer-json",
    `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
  ],
}
