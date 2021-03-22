import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import ProjectCard from "./project-card"
import { Typography, Grid } from "@material-ui/core"

const FeaturedProject = () => {
  const {
    dataJson: { projects },
  } = useStaticQuery(graphql`
    query FeaturedProjectQuery {
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
          featured
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

  const randoms = projects.filter(project => !project.featured)
  const project = projects.find(project => project.featured)
  const current = randoms[Math.floor(Math.random() * randoms.length)]

  return (
    <Grid container spacing={3} justify="space-around">
      <Grid item>
        <Typography variant="h5" gutterBottom>
          Featured Project
        </Typography>
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
            project.image.childImageSharp.gatsbyImageData.images.fallback.src
          }
        />
      </Grid>
      <Grid item>
        <Typography variant="h5" gutterBottom>
          Random Project
        </Typography>
        <ProjectCard
          title={current.title}
          date={new Date(current.time, 0, 1)}
          description={current.description}
          links={current.links}
          // For GatsbyImage
          // image={getImage(project.image)}
          // CardMedia hack
          image={
            current.image &&
            current.image.childImageSharp.gatsbyImageData.images.fallback.src
          }
        />
      </Grid>
    </Grid>
  )
}

export default FeaturedProject
