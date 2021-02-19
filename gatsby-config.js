module.exports = {
  plugins: [
    "gatsby-transformer-json",
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-material-ui`,
    {
      resolve: "gatsby-source-dynamodb",
      options: {
        typeName: "InformationItem",
        accessKeyId: `${process.env.DB_ACCESS_ID}`,
        secretAccessKey: `${process.env.DB_ACCESS_KEY}`,
        region: `${process.env.DB_REGION}`,
        params: {
          TableName: "hwebs-info",
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
  ],
}
