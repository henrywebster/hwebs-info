import React from "react"
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  withStyles,
} from "@material-ui/core"
import IconHelper from "./IconHelper"

const styles = theme => ({
  root: {
    maxWidth: 425,
  },
})

const ProjectCard = withStyles(styles)(
  ({ title, date, description, links, classes }) => (
    <Card className={classes.root}>
      <CardHeader
        title={title}
        subheader={date.toLocaleDateString("en-US", { year: "numeric" })}
        titleTypographyProps={{ color: "primary" }}
      ></CardHeader>
      <CardContent>
        <Typography variant="body2">{description}</Typography>
        <CardActions disableSpacing>
          {links &&
            links.map((link, index) => (
              <IconButton
                component="a"
                href={link.href}
                target="_blank"
                key={index}
              >
                <IconHelper icon={link.type} />
              </IconButton>
            ))}
        </CardActions>
      </CardContent>
    </Card>
  )
)

export default ProjectCard
