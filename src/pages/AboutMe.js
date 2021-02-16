import React from "react"
import {
  ThemeProvider,
  Container,
  Box,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  List,
  Grid,
} from "@material-ui/core"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import EmailIcon from "@material-ui/icons/Email"
import TwitterIcon from "@material-ui/icons/Twitter"
import Typography from "@material-ui/core/Typography"
import theme from "../../theme"

export const query = graphql`
  query {
    file(relativePath: { eq: "headshot.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 400, height: 400) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

export default function AboutMe({ data }) {
  return (
    <ThemeProvider theme={theme}>
      <Grid container direction="row" justify="center" spacing={6}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h1" gutterBottom>
            About Me
          </Typography>
        </Grid>
        <Grid item>
          <Box bgcolor="Coral" borderRadius={12}>
            <Img fixed={data.file.childImageSharp.fixed} alt="" />
          </Box>
        </Grid>
        <Grid item component={Container} maxWidth="sm">
          <Grid container direction="column" spacing={6}>
            <Grid item>
              <Typography variant="h5" component="h2" gutterBottom>
                Jist
              </Typography>

              <Typography variant="body1" gutterBottom>
                Developer with 3 years professional experience in critical
                backend financial services. Highly adaptable with a past in game
                engine programming before learning web services and cloud on the
                job. Passionate about collaborating across domains of expertise
                and delivering quality solutions end-to-end.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" component="h2" gutterBottom>
                About
              </Typography>
              <Typography variant="body1" gutterBottom>
                Hello! My name is Henry.
              </Typography>
              <Typography variant="body1" gutterBottom>
                I am a programmer based in NYC. Currently, I work at JPMorgan
                Chase in a DevOps environment on a loan system API that services
                thousands of clients across the globe. I built out new auto
                payment and loan prequalification features on the platform. I
                also planned an overhaul of the CI/CD pipeline that deploys
                services to production quickly, with more consistency, and more
                stability. My curiosity takes me all over the place and I love
                learning new technologies and approaches while building
                interesting projects.
              </Typography>
              <Typography variant="body1" gutterBottom>
                I enjoy dabbling in game development, 3D art, urban gardening,
                and photography. I'm an avid cyclist, reader, coffee-lover, and
                self-proclaimed productivity nerd. I have fun with home audio
                production and playing guitar. Occaisonally, I put out my own
                music. If you want to know my opinion on Chicago vs. NY pizza,
                or get a copy of my resume, feel free to reach out via email. I
                am also on Twitter. Cheers!
              </Typography>
            </Grid>
            {/* <Container maxWidth="xs"> */}
          </Grid>
        </Grid>
        <Grid item>
          <Box
            borderRadius={12}
            style={{
              //       background: "linear-gradient(to bottom right, Tomato, DarkBlue)",
              background: "DarkBlue",
            }}
          >
            {/* TODO: why `nav`? */}
            <Container maxWidth="xs">
              <List component="nav">
                <ListSubheader>Links</ListSubheader>
                <ListItem button component="a" href="mailto:hwebs@hwebs.info">
                  <ListItemIcon>
                    <EmailIcon />{" "}
                  </ListItemIcon>
                  <ListItemText primary="Email" />
                </ListItem>
                <ListItem
                  button
                  component="a"
                  href="https://twitter.com/hank29a"
                >
                  <ListItemIcon>
                    <TwitterIcon />{" "}
                  </ListItemIcon>
                  <ListItemText primary="Twitter" />
                </ListItem>
              </List>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
