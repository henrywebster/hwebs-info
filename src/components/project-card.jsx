import React, { lazy } from "react"
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  IconButton,
  withStyles,
} from "@material-ui/core"
import IconHelper from "./IconHelper"
import labrat from "../images/lab-rat.webp"

const styles = theme => ({
  root: {
    maxWidth: 425,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
})

const ProjectCard = withStyles(styles)(
  ({ title, date, description, links, image, classes }) => (
    <Card className={classes.root}>
      {image && (
        <CardMedia
          //   image={lazy(() => import("../images/lab-rat.webp"))}
          //   image={`../images/${image}`}
          image={labrat}
          title={title}
          className={classes.media}
          role="img"
        />
      )}
      <CardHeader
        title={title}
        subheader={date.toLocaleDateString("en-US", { year: "numeric" })}
        titleTypographyProps={{ color: "primary" }}
      ></CardHeader>
      <CardContent>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
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
    </Card>
  )
)

export default ProjectCard
