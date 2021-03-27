import React from "react"
import { Typography } from "@material-ui/core"
import SEO from "../components/seo"
import Section from "../components/section"

const ErrorPage = () => (
  <Section
    id="error"
    component="section"
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    <SEO title="404 Not Found" />
    <div>
      <Typography variant="h3" component="h1" color="primary" gutterBottom>
        404: Not Found
      </Typography>
      <Typography variant="body1">This page does not exist.</Typography>
    </div>
  </Section>
)

export default ErrorPage
