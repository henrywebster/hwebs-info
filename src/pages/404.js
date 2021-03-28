import React from "react"
import { Typography } from "@material-ui/core"
import SEO from "../components/seo"
import Section from "../components/section"
import { HeadingTypography } from "../components/typography-wrapper"

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
      <HeadingTypography component="h1">404: Not Found</HeadingTypography>
      <Typography variant="body1">This page does not exist.</Typography>
    </div>
  </Section>
)

export default ErrorPage
