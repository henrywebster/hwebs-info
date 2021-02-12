import { createMuiTheme } from "@material-ui/core/styles"
import React from "react"
import { PersonalItem, InfoType } from "../components/PersonalItem"
import { Box, Container, CssBaseline } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/core"

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
const theme = createMuiTheme({
  typography: {
    fontFamily: ['"Signika"', '"Open Sans"', "sans-serif"].join(","),
  },
  palette: {
    text: {
      primary: "white",
    },
    primary: {
      main: "#000",
      mainGradient: "linear-gradient(to bottom right, Tomato, DarkBlue)",
      secondary: "#fff",
    },
    background: {
      default: "DarkBlue",
    },
  },
  overrides: {
    MuiListItemIcon: {
      root: {
        color: "HoneyDew",
      },
    },
    MuiListItem: {
      root: {
        color: "HoneyDew",
      },
    },
  },
})

export default function Home({ data }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box style={{ background: theme.palette.primary.mainGradient }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          // style={{background: theme.palette.primary.mainGradient}}
        >
          {/* <Box border={3} borderRadius={12} borderColor="primary.secondary"> */}
          <Container maxWidth="xs">
            {data.allInformationItem.edges.map(({ node }, index) => (
              <PersonalItem text={node.text} icon={InfoType[node.iconType]} />
            ))}
          </Container>
        </Box>
      </Box>
      {/* </Box> */}
    </ThemeProvider>
  )
}
