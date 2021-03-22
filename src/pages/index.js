import React from "react"
import { Typography, Grid, Box, Container, withStyles } from "@material-ui/core"
import computer from "../images/computer.webp"
import { useStaticQuery, graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import SEO from "../components/seo"
import Emoji from "../components/emoji"
import ProjectCard from "../components/project-card"

const styles = theme => ({
  social: {
    margin: 10,
  },
  root: {
    flexGrow: 1,
  },
  img: {
    maxWidth: "100%",
  },
})

const SocialLink = withStyles(styles)(({ icon, text, href, classes }) => (
  <Typography
    variant="body1"
    color="primary"
    component="a"
    href={href}
    target="_blank"
    className={classes.social}
  >
    <Emoji emoji={icon} /> {text}
  </Typography>
))

const Welcome = () => (
  <div>
    <Typography variant="h4">
      Welcome <Emoji emoji="👋" />
    </Typography>
    <Typography variant="body1" component="div">
      My name is Henry J. Webster, a programmer in Brooklyn, NY. <br />
      <br />
      <Emoji emoji="☀️" /> At work I'm building loan web services @
      <Typography
        variant="body1"
        color="primary"
        component="a"
        href="https://www.jpmorgan.com/commercial-banking"
        target="_blank"
      >
        JPMorgan Chase
      </Typography>
      . <br />
      <Emoji emoji="🌔" /> At night I experiment with game development, music,
      and 3D art.
    </Typography>
  </div>
)

const Section = ({ id, children }) => (
  <Box
    component="section"
    id={id}
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    {children}
  </Box>
)

const socials = [
  {
    icon: "✉️",
    text: "Email",
    href: "mailto:hwebs@hwebs.info",
  },
  {
    icon: "🐙",
    text: "GitHub",
    href: "https://github.com/henrywebster",
  },
  {
    icon: "🐦",
    text: "Twitter",
    href: "https://twitter.com/hank29a",
  },
  {
    icon: "🕹️",
    text: "itch.io",
    href: "https://hank29a.itch.io/",
  },
]

const Index = withStyles(styles)(({ classes }) => {
  const data = useStaticQuery(graphql`
    query ProjectIndexQuery {
      dataJson {
        projects {
          description
          links {
            href
            type
          }
          tags
          time
          title
          image {
            childImageSharp {
              gatsbyImageData(
                width: 425
                formats: WEBP
                webpOptions: { quality: 100 }
              )
            }
          }
        }
      }
    }
  `)

  return (
    <Container maxWidth="md">
      <SEO title="Henry J. Webster" />
      <Section id="home" className={classes.root}>
        <Grid
          container
          component="section"
          id="home"
          justify="space-between"
          alignItems="center"
          spacing={3}
        >
          <Grid container item sm={12} md={4} justify="center">
            <img src={computer} alt="" className={classes.img} />
          </Grid>
          <Grid container item sm={12} md={8} justify="center">
            <Welcome />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              {socials.map((social, index) => (
                <SocialLink {...social} key={index} />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Section>
      <Section id="projects">
        <Box>
          <Typography variant="h4" gutterBottom>
            Projects <Emoji emoji="🏗️" />
          </Typography>
          <Box marginBottom={10}>
            <Typography variant="body1" gutterBottom>
              I enjoy creating in my free time, whether it be art or technology.
            </Typography>
          </Box>
          <Grid container spacing={3} justify="space-around">
            {data.dataJson.projects.map((project, index) => (
              <Grid item key={index}>
                <ProjectCard
                  title={project.title}
                  date={new Date(project.time, 0, 1)}
                  description={project.description}
                  links={project.links}
                  // For GatsbyImage
                  // image={getImage(project.image)}
                  // CardMedia hack
                  image={
                    project.image &&
                    project.image.childImageSharp.gatsbyImageData.images
                      .fallback.src
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Section>
      <Section id="about">
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom>
            About <Emoji emoji="🧑‍🦰" />
          </Typography>

          <br />
          <Typography variant="body1">
            I have 3 years of professional experience in software. My curiosity
            takes me all over the place and I love learning new technologies and
            approaches while building interesting projects. <br /> <br />
            I'm an avid cyclist, reader, coffee-lover, and productivity nerd. I
            have fun with home audio production and playing guitar. <br />{" "}
            <br />
            Thanks for checking out my website! <br />
            Henry J. Webster
          </Typography>
          <Typography
            color="primary"
            component="a"
            href="mailto:hwebs@hwebs.info"
          >
            hwebs@hwebs.info
          </Typography>
        </Container>
      </Section>
    </Container>
  )
})

export default Index
