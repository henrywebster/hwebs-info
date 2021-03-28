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
  Chip,
} from "@material-ui/core"
import IconHelper from "./IconHelper"
// import { GatsbyImage } from "gatsby-plugin-image"

const styles = theme => ({
  root: {
    maxWidth: 425,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
})

const extractYear = date =>
  date.toLocaleDateString("en-US", { year: "numeric" })

const convertDateText = (startDate, endDate) =>
  startDate && startDate.getFullYear() !== endDate.getFullYear()
    ? `${extractYear(startDate)} - ${extractYear(endDate)}`
    : extractYear(endDate)

const ProjectCard = withStyles(styles)(
  ({ title, description, links, image, startDate, endDate, tags, classes }) => (
    <>
      <Card className={classes.root}>
        {/* {image && <GatsbyImage image={getImage(image)} alt="" role="img" />} */}
        {image && (
          <CardMedia
            image={image}
            title={title}
            className={classes.media}
            role="img"
          ></CardMedia>
        )}
        <CardHeader
          title={title}
          subheader={convertDateText(startDate, endDate)}
          titleTypographyProps={{ color: "primary" }}
        ></CardHeader>
        <CardContent>
          <Typography variant="body2">{description}</Typography>
          {tags &&
            tags.map((tag, index) => (
              <Chip
                label={tag}
                size="small"
                key={index}
                className={classes.chip}
              />
            ))}
        </CardContent>
        <CardActions disableSpacing>
          {links &&
            links.map((link, index) => (
              <IconButton
                component="a"
                href={link.href}
                target="_blank"
                key={index}
                aria-label={link.type}
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
