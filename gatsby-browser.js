import React from "react"
import Sidebar from "./src/components/Sidebar"

export const wrapRootElement = ({ element, props }) => (
  <Sidebar {...props}>{element}</Sidebar>
)
