import React from "react"
import { Container, Grid, withStyles } from "@material-ui/core"
import { useStaticQuery, graphql } from "gatsby"
import Section from "../components/section"
import ProjectCard from "../components/project-card"
import SEO from "../components/seo"
import { HeadingTypography } from "../components/typography-wrapper"

const styles = theme => ({
  top: {
    marginTop: 80,
  },
})

const Archive = withStyles(styles)(({ classes }) => {
  const {
    allProjectsJson: { nodes },
  } = useStaticQuery(graphql`
    {
      allProjectsJson(sort: { fields: endDate, order: DESC }) {
        nodes {
          title
          startDate
          endDate
          description
          links {
            href
            type
          }
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
      <SEO title="Archive" />
      <Section id="archive">
        <div className={classes.top}>
          <HeadingTypography>Archive</HeadingTypography>
          <Grid container spacing={3} justify="center">
            {nodes.map(({ image, startDate, endDate, ...project }, index) => (
              <Grid item key={index}>
                <ProjectCard
                  startDate={new Date(startDate)}
                  endDate={new Date(endDate)}
                  image={
                    image &&
                    image.childImageSharp.gatsbyImageData.images.fallback.src
                  }
                  {...project}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </Section>
    </Container>
  )
})

export default Archive
