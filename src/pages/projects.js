import React from "react"
import { Helmet } from "react-helmet"
import { Typography, Grid } from "@material-ui/core"
import { useStaticQuery } from "gatsby"
import ProjectCard from "../components/ProjectCard"

export default function Projects() {
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
        }
      }
    }
  `)

  return (
    <>
          <Helmet>
        <meta charSet="utf-8" />
        <title>Projects - Henry J Webster</title>
      </Helmet>
      <Typography variant="h2" component="h2" color="primary">
        Projects
      </Typography>
      <Grid container spacing={3} direction="column">
        {data.dataJson.projects.map(project => (
          <Grid item key={project.title}>
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
    </>
  )
}
