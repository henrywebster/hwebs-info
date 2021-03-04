import React from "react"
import { Helmet } from "react-helmet"
import { Typography } from "@material-ui/core"

export default function errorPage(props) {
  return (
    <Typography variant="h2" component="h2" color="primary">
      <Helmet>
        <meta charSet="utf-8" />
        <title>404 - Henry J Webster</title>
      </Helmet>

      Error 404 - Page Not Found
    </Typography>
  )
}
