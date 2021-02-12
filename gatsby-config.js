module.exports = {
  plugins: [
    "gatsby-transformer-json",
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
  ],
}
