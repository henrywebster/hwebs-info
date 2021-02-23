import React from "react"
import Sidebar from "./src/components/Sidebar"

export function wrapPageElement({ element, props }) {
  return <Sidebar {...props}>{element}</Sidebar>
}
