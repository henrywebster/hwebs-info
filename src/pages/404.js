import React from "react"
import SEO from "../components/seo"
import Section from "../components/section"
import {
  HeadingTypography,
  BodyTypography,
} from "../components/typography-wrapper"

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
      <BodyTypography>This page does not exist.</BodyTypography>
    </div>
  </Section>
)

export default ErrorPage
