import React from "react"
import Sidebar from "./src/components/Sidebar"
const ReactDOM = require("react-dom")

export function replaceHydrateFunction() {
  return (element, container, callback) => {
    ReactDOM.render(element, container, callback)
  }
}

export function wrapPageElement({ element, props }) {
  return <Sidebar {...props}>{element}</Sidebar>
}
