import React from "react"
import { Container, Grid, withStyles } from "@material-ui/core"
import { useStaticQuery, graphql } from "gatsby"
import Section from "../components/section"
import ProjectCard from "../components/project-card"

const styles = theme => ({
  top: {
    marginTop: 50,
  },
})

const Archive = withStyles(styles)(({ classes }) => {
  const {
    dataJson: { projects },
  } = useStaticQuery(graphql`
    query {
      dataJson {
        projects {
          title
          date
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
      <Section id="archive">
        <div className={classes.top}>
          <h2>Archive</h2>
          <Grid container spacing={3} justify="center">
            {projects.map(({ image, date, ...project }, index) => (
              <Grid item key={index}>
                <ProjectCard
                  date={new Date(date)}
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
