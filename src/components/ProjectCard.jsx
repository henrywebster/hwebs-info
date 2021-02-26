import React from "react"
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core"
import classes from "./ProjectCard.scss"

const ulStyle = {
  margin: "0",
  padding: "0",
}

export default function ProjectCard(props) {
  // const classes = useStyles()

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h3">
          {props.title}
        </Typography>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          {props.year}
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          <ul className={`${classes.ul} ul`}>
            <li className={`${classes.li} li`}>
              Cut manual developer time for pre-production deployment from 1
              hour to minutes
            </li>
            <li className={`${classes.li} li`}>
              Stabilized production by creating immutable release versioning
              with tags in SCM for quick bug-fixing of past versions and
              confident rollbacks
            </li>
            <li className={`${classes.li} li`}>
              Migration to firm-maintained pipeline freed 2 team members from
              tasks for maintaining custom setup, allowing them to focus on
              enhancements
            </li>
          </ul>
        </Typography>
      </CardContent>
    </Card>
  )
}
