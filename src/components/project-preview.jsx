import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import ProjectCard from "./project-card"
import { Typography, Grid, Button } from "@material-ui/core"

function shuffle(array) {
  let counter = array.length
  console.log("Shuffled!")
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter)

    counter--

    let temp = array[counter]
    array[counter] = array[index]
    array[index] = temp
  }

  return array
}

const ProjectPreview = () => {
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

  const randoms = shuffle(projects.filter(project => !project.featured))

  console.log(randoms)

  const [active, setActive] = useState(0)

  const advanceShuffle = () => {
    if (active == randoms.length - 1) {
      setActive(0)
    } else {
      setActive(active + 1)
    }
  }

  // const random = randoms.length
  //   ? randoms[Math.floor(Math.random() * randoms.length)]
  //   : undefined
  const project = projects.find(project => project.featured)

  return (
    <Grid container spacing={3} justify="space-around">
      {project && (
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
      )}
      {randoms.length && (
        <Grid item>
          <Typography variant="h5" gutterBottom>
            Random Project
          </Typography>
          <Button onClick={advanceShuffle}>Shuffle</Button>
          <ProjectCard
            title={randoms[active].title}
            date={new Date(randoms[active].time, 0, 1)}
            description={randoms[active].description}
            links={randoms[active].links}
            // For GatsbyImage
            // image={getImage(project.image)}
            // CardMedia hack
            image={
              randoms[active].image &&
              randoms[active].image.childImageSharp.gatsbyImageData.images
                .fallback.src
            }
          />
        </Grid>
      )}
    </Grid>
  )
}

export default ProjectPreview
