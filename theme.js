import { createMuiTheme } from "@material-ui/core/styles"

const darkTheme = createMuiTheme({
  typography: {
    fontFamily: [
      '"Source Sans Pro"',
      '"Roboto"',
      '"Open Sans"',
      "sans-serif",
    ].join(","),
  },
  palette: {
    type: "dark",
    primary: {
      main: "#2ee779",
    },
    secondary: {
      main: "#504fff",
    },
    action: {
      hover: "#504fff88",
      selected: "#504fffdd",
    },
  },
  overrides: {
    MuiTypography: {
      h4: {
        fontWeight: "900",
      },
    },
  },
})

export { darkTheme }
