import React from "react"
import { Typography, Box } from "@material-ui/core"
import SEO from "../components/seo"

export default function errorPage(props) {
  return (
    // TODO: split out section component
    <Box
      component="section"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <SEO title="404 Not Found - Henry J. Webster" />
      <div>
        <Typography variant="h3" component="h1" color="primary" gutterBottom>
          404: Not Found
        </Typography>
        <Typography variant="body1">This page does not exist.</Typography>
      </div>
    </Box>
  )
}
