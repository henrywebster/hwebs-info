import { createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
  typography: {
    fontFamily: ['"Signika"', '"Open Sans"', "sans-serif"].join(","),
  },
  palette: {
    //     text: {
    //       primary: "white",
    //     },
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
    MuiListSubheader: {
      root: {
        color: "HoneyDew",
      },
    },
  },
})

export default theme
