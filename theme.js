import { createMuiTheme } from "@material-ui/core/styles"

const typography = {
  fontFamily: ['"Source Sans Pro"', "sans-serif"].join(","),
}

const overrides = {
  MuiTypography: {
    h2: {
      fontWeight: "900",
    },
    h4: {
      fontWeight: "900",
    },
  },
}

const darkTheme = createMuiTheme({
  typography: typography,
  overrides: overrides,
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

const lightTheme = createMuiTheme({
  typography: typography,
  overrides: overrides,
  palette: {
    type: "light",
    primary: {
      light: "#8f7cff",
      main: "#504fff",
      dark: "#0025cb",
    },
    secondary: {
      light: "#66ffa6",
      main: "#00e676",
      dark: "#00b248",
    },
    action: {
      hover: "#00e67688",
      selected: "#00e676bb",
    },
  },
})

export { darkTheme, lightTheme }
