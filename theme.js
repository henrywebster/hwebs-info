import { createMuiTheme } from "@material-ui/core/styles"
import "typeface-roboto"

const defaultTheme = createMuiTheme({
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
  palette: {
    type: "dark",
    primary: {
      light: "#66ffa6",
      main: "#00e676",
      dark: "#00b248",
    },
    secondary: {
      light: "#8f7cff",
      main: "#504fff",
      dark: "#0025cb",
    },
    action: {
      hover: "#504fffbb",
      selected: "#504fff",
    },
  },
})
const { breakpoints } = defaultTheme

const theme = {
  ...defaultTheme,
  overrides: {
    MuiButton: {
      root: {
        fontSize: ".75rem",
      },
    },
    MuiTypography: {
      body1: {
        [breakpoints.down("xs")]: {
          fontSize: ".75rem",
        },
      },
      body2: {
        [breakpoints.down("xs")]: {
          fontSize: ".75rem",
        },
      },
      button: {
        [breakpoints.down("xs")]: {
          fontSize: ".75rem",
        },
      },
    },
  },
}

export default theme
