import React, { useState, useEffect, useCallback } from "react"
import ProjectCard from "./project-card"
import { Typography, Grid, Button, Box } from "@material-ui/core"
import Emoji from "./emoji"

const Title = ({ children }) => (
  <Box
    display="flex"
    justifyContent="space-between"
    alignContent="center"
    alignItems="center"
    minHeight={50}
  >
    {children}
  </Box>
)

const ProjectPreview = ({ featured, randoms = [] }) => {
  const [active, setActive] = useState(0)

  // Hack: this is to force an update so the (possibly incorrect) static image doesn't show
  const advanceOne = useCallback(() => {
    if (randoms.length > 1) {
      setActive(1)
    }
  }, [randoms.length])

  useEffect(() => advanceOne(), [advanceOne])

  const advanceShuffle = () => {
    if (active === randoms.length - 1) {
      setActive(0)
    } else {
      setActive(active + 1)
    }
  }

  return (
    <Grid container spacing={3} justify="space-around">
      {featured && (
        <Grid item>
          <Title>
            <Typography variant="h5">
              Featured <Emoji emoji="🌟" />
            </Typography>
          </Title>
          <ProjectCard
            title={featured.title}
            date={new Date(featured.date)}
            description={featured.description}
            links={featured.links}
            // For GatsbyImage
            // image={getImage(project.image)}
            // CardMedia hack
            image={
              featured.image &&
              featured.image.childImageSharp.gatsbyImageData.images.fallback.src
            }
          />
        </Grid>
      )}
      {randoms.length && (
        <Grid item>
          <Title>
            {/* Move into Title component*/}
            <Typography variant="h5" component="span">
              Random <Emoji emoji="🎲" />
            </Typography>
            <Button
              onClick={advanceShuffle}
              color="primary"
              variant="contained"
            >
              Shuffle
            </Button>
          </Title>
          <ProjectCard
            title={randoms[active].title}
            date={new Date(randoms[active].date)}
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
