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

export { LinkTypography }
