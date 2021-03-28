import React from "react"
import { Typography } from "@material-ui/core"

const LinkTypography = ({ component = "a", children, ...props }) => (
  <Typography
    component={component}
    color="primary"
    variant="subtitle2"
    {...props}
  >
    {children}
  </Typography>
)

const HeadingTypography = ({ children, ...props }) => (
  <Typography variant="h4" component="h1" gutterBottom {...props}>
    {children}
  </Typography>
)

const BodyTypography = ({ children, ...props }) => (
  <Typography variant="body1" {...props}>
    {children}
  </Typography>
)

export { LinkTypography, HeadingTypography, BodyTypography }
