import React from "react"
import { Box } from "@material-ui/core"

const Section = ({ id, children, ...props }) => (
  <Box
    component="section"
    id={id}
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    {children}
  </Box>
)

export default Section
