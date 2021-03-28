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
  <Typography variant="h4" gutterBottom {...props}>
    {children}
  </Typography>
)

export { LinkTypography, HeadingTypography }
