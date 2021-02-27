import React from "react"
import { Typography, Link, Grid } from "@material-ui/core"
import ProjectCard from "../components/ProjectCard"
import { useStaticQuery } from "gatsby"

export default function About(props) {
  const data = useStaticQuery(graphql`
    query ProjectQuery {
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
          image
        }
      }
    }
  `)

  console.log(data)
  return (
    <>
      <Grid container spacing={3}>
        {data.dataJson.projects.map(project => (
          <Grid item>
            <ProjectCard
              title={project.title}
              year={project.time}
              description={project.description}
              tags={project.tags}
              links={project.links}
            />
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" component="h2" gutterBottom>
        About
      </Typography>
      <Typography variant="body1" gutterBottom>
        Developer with 3 years professional experience in critical backend
        financial services. Highly adaptable with a past in game engine
        programming before learning web services and cloud on the job.
        Passionate about collaborating across domains of expertise and
        delivering quality solutions end-to-end.
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom>
        Technology
      </Typography>
      <Typography variant="body1" gutterBottom>
        I am a programmer based in NYC. Currently, I work at JPMorgan Chase in a
        DevOps environment on a loan system API that services thousands of
        clients across the globe.
      </Typography>
      <Typography variant="body1" gutterBottom>
        I built out:
        <ul>
          <li>New auto payment enchancement</li>
          <li>New loan prequalification feature</li>
          <li>Jenkins-based CI/CD pipeine overhaul</li>
        </ul>
        My curiosity takes me all over the place and I love learning new
        technologies and approaches while building interesting projects.
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom>
        Personal
      </Typography>
      <Typography variant="body1" gutterBottom>
        I'm an avid cyclist, reader, coffee-lover, and productivity nerd. I have
        fun with home audio production and playing guitar. Occaisonally, I put
        out my own music.
      </Typography>
      <Typography variant="body1" gutterBottom>
        I enjoy dabbling in:
        <ul>
          <li>Game Development</li>
          <li>3D Art</li>
          <li>Urban Gardening</li>
          <li>Photography</li>
        </ul>
      </Typography>

      <Typography variant="body1" gutterBottom>
        If you want to know my opinion on Chicago vs. NY pizza, or get a copy of
        my resume, feel free to reach out via email.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Cheers!
        <br />
        Henry J. Webster
        <br />
        <Link href="mailto:hwebs@hwebs.info">hwebs@hwebs.info</Link>
      </Typography>
    </>
  )
}
