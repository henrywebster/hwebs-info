import React from "react"
import { Typography, Grid, Box, Container, withStyles } from "@material-ui/core"
import { useStaticQuery, graphql, Link } from "gatsby"
import computer from "../images/computer.webp"
import portrait from "../images/portrait.webp"
import SEO from "../components/seo"
import Emoji from "../components/emoji"
import ProjectPreview from "../components/project-preview"
import Section from "../components/section"
import {
  LinkTypography,
  HeadingTypography,
  BodyTypography,
} from "../components/typography-wrapper"

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

const styles = theme => ({
  social: {
    margin: 10,
  },
  img: {
    maxWidth: "100%",
    width: "400",
    alignSelf: "center",
  },
  portrait: {
    maxWidth: "80%",
    width: "200",
    alignSelf: "center",
    borderRadius: "3%",
  },
})

const SocialLink = withStyles(styles)(({ icon, text, href, classes }) => (
  <LinkTypography
    variant="body1"
    color="primary"
    href={href}
    target="_blank"
    className={classes.social}
  >
    <Emoji emoji={icon} /> {text}
  </LinkTypography>
))

const Welcome = () => (
  <div>
    <HeadingTypography>
      Welcome <Emoji emoji="👋" />
    </HeadingTypography>
    <BodyTypography component="div">
      I'm Henry J. Webster, a programmer in Brooklyn, NY. <br />
      <br />
      <Emoji emoji="☀️" /> At work I'm building open banking services @
      <LinkTypography
        variant="inherit"
        href="https://www.prismdata.com/"
        target="_blank"
      >
        Prism Data
      </LinkTypography>
      . <br />
      <Emoji emoji="🌔" /> At night I experiment with game development, music,
      and 3D art.
    </BodyTypography>
    <br /> <br />
    <Highlights />
  </div>
)

const Highlights = () => (
  <div>
    <BodyTypography gutterBottom>What I work with:</BodyTypography>
    {Object.entries(highlights).map(([k, v], index) => (
      <Typography variant="body2" gutterBottom key={index}>
        <b>{capitalize(k)}</b> — {v.join(", ")}
      </Typography>
    ))}
  </div>
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

const highlights = {
  languages: ["Java", "JavaScript", "Python"],
  frameworks: ["Spring", "React"],
  platforms: ["AWS", "VMWare Tanzu"],
  programs: ["Godot", "Ardour", "Blender"],
}

// Fisher-Yates shuffle from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(a) {
  var j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}

const Index = withStyles(styles)(({ classes }) => {
  const {
    allProjectsJson: { nodes },
  } = useStaticQuery(graphql`
    query {
      allProjectsJson {
        nodes {
          description
          links {
            href
            type
          }
          startDate
          endDate
          title
          featured
          tags
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

  const randoms = shuffle(nodes.filter(project => !project.featured))
  const featured = nodes.find(project => project.featured)

  return (
    <Container maxWidth="md">
      <SEO title="Home" />
      <Section id="home">
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
          <HeadingTypography>
            Projects <Emoji emoji="🏗️" />
          </HeadingTypography>
          <Box marginBottom={5}>
            <BodyTypography gutterBottom>
              I enjoy creating in my free time, whether it be art or technology.
            </BodyTypography>
            <br />
            <BodyTypography>
              {"See all my projects in "}
              <LinkTypography variant="inherit" component={Link} to="/archive">
                the archive
              </LinkTypography>
              .
            </BodyTypography>
          </Box>
          <ProjectPreview featured={featured} randoms={randoms} />
        </Box>
      </Section>
      <Section id="about">
        <Grid
          container
          component="section"
          id="about"
          justify="space-between"
          alignItems="center"
          spacing={6}
        >
          <Grid container item sm={12} md={6} justify="center">
            <img
              src={portrait}
              alt="Henry J Webster in green crocs"
              className={classes.portrait}
            />
          </Grid>
          <Grid container item sm={12} md={6} justify="left">
            <HeadingTypography>
              About <Emoji emoji="👷🏻" />
            </HeadingTypography>
            <Box justifyContent="left">
              <BodyTypography>
                I have 3 years of professional experience in software. My
                curiosity takes me all over the place and I love learning new
                technologies and approaches while building interesting projects.{" "}
                <br /> <br />
                I'm an avid cyclist, reader, coffee-lover, and productivity
                nerd. I enjoy home audio production and playing guitar. Recently
                I have taken up woodworking (I made the side table in the
                photo!) If you want to send me something you've made or have any
                questions, don't hesitate to reach out.
                <br /> <br />
                Thanks for checking out my website! <br />
                Henry J. Webster
              </BodyTypography>
              <LinkTypography
                color="primary"
                variant="body1"
                component="a"
                href="mailto:hwebs@hwebs.info"
              >
                hwebs@hwebs.info
              </LinkTypography>
            </Box>
          </Grid>
        </Grid>
      </Section>
    </Container>
  )
})

export default Index
