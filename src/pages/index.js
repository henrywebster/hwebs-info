import React from "react"
import { Helmet } from "react-helmet"
import { Typography } from "@material-ui/core"

export default function Home({ data }) {
  return (
    <Typography variant="h2" component="h2" color="primary">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home - Henry J Webster</title>
      </Helmet>
      I make technology that works.
    </Typography>
  )
}
