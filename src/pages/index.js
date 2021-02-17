import { createMuiTheme } from "@material-ui/core/styles"
import React from "react"
import { PersonalItem, InfoType } from "../components/PersonalItem"
import { Box, Container, CssBaseline } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/core"
import Sidebar from "../components/Sidebar"
import { darkTheme } from "../../theme"

export const query = graphql`
  query InformationQuery {
    allInformationItem(
      filter: { type: { eq: "InformationItem" }, hidden: { eq: false } }
      sort: { fields: [priority] }
    ) {
      edges {
        node {
          text
          iconType
        }
      }
    }
  }
`

export default function Home({ data }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Sidebar />
    </ThemeProvider>
  )
}
