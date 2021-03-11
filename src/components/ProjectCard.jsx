import React from "react"
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  CardMedia,
  Typography,
  makeStyles,
  Chip,
  IconButton,
  Box,
} from "@material-ui/core"
import GitHubIcon from "@material-ui/icons/GitHub"
import OpenInNewIcon from "@material-ui/icons/OpenInNew"
import { SiItchDotIo } from "@react-icons/all-files/si/SiItchDotIo"
import { SiSpotify } from "@react-icons/all-files/si/SiSpotify"
import { SiBandcamp } from "@react-icons/all-files/si/SiBandcamp"

// TODO: this does nothing
// import theme from "../../theme"
// import Img from "gatsby-image"

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 450,
  },
  title: {
    paddingBottom: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  titleBar: {
    marginRight: theme.spacing(1.5),
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
}))

export default function ProjectCard(props) {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardHeader
        title={props.title}
        subheader={props.year}
        titleTypographyProps={{ color: "primary" }}
        className={classes.title}
      />
      <CardContent>
        <Typography variant="body1" color="textPrimary" gutterBottom>
          {props.description}
        </Typography>
        {props.tags.map(tag => (
          <Chip
            variant="outlined"
            label={tag}
            color="primary"
            size="small"
            className={classes.chip}
            key={tag}
          />
        ))}
      </CardContent>
      {/* <CardMedia
          image={labrat} title="labrat" className={classes.media}/> */}
      <CardActions disableSpacing>
        {props.links.map(link => (
          <IconButton href={link.href} target="_blank" key={link.href}>
            {link.type === "github" && <GitHubIcon />}
            {link.type === "external" && <OpenInNewIcon />}
            {link.type === "itchio" && <SiItchDotIo />}
            {link.type === "spotify" && <SiSpotify />}
            {link.type === "bandcamp" && <SiBandcamp />}
          </IconButton>
        ))}
      </CardActions>
    </Card>
  )
}
