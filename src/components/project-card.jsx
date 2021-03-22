import React from "react"
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
import { GatsbyImage } from "gatsby-plugin-image"

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
    <>
      <Card className={classes.root}>
        {/* {image && <GatsbyImage image={getImage(image)} alt="" role="img" />} */}
        {image && (
          <CardMedia
            image={image}
            title={title}
            className={classes.media}
            role="img"
          >
            {/* <div> Hello</div> */}
          </CardMedia>
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
    </>
  )
)

export default ProjectCard
