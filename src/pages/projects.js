import React from "react"
import { Helmet } from "react-helmet"
import { Grid } from "@material-ui/core"
import { useStaticQuery, graphql } from "gatsby"
import ProjectCard from "../components/ProjectCard"
import PageTitle from "../components/pageTitle"

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
      <PageTitle title="Projects" />
      <Grid container spacing={3} justify="space-around">
        {data.dataJson.projects.map((project, index) => (
          <Grid item key={index}>
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
