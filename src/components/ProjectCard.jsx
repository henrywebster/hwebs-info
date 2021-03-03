import React from "react"
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  Chip,
  IconButton,
  Box,
} from "@material-ui/core"
import GitHubIcon from "@material-ui/icons/GitHub"
import OpenInNewIcon from "@material-ui/icons/OpenInNew"

// TODO: this does nothing
// import theme from "../../theme"
// import Img from "gatsby-image"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    width: "100%",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  titleBar: {
    marginRight: theme.spacing(1.5),
  },
  media: {
    minWidth: "30%",
    display: "flex",
    objectFit: "cover",
  },
}))

export default function ProjectCard(props) {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" component="span" className={classes.titleBar}>
          {props.title}
        </Typography>
        <Typography
          variant="subtitle1"
          color="primary"
          component="span"
          gutterBottom
        >
          {props.year}
        </Typography>
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
        <Box>
          {props.links.map(link => (
            <IconButton href={link.href} target="_blank" key={link.href}>
              {link.type === "github" && <GitHubIcon />}
              {link.type === "external" && <OpenInNewIcon />}
            </IconButton>
          ))}
        </Box>
      </CardContent>
      {/* <img src={labrat} className={classes.media} /> */}

      {/* <Hidden xsDown>
        <img src={labrat} className={classes.media} />
      </Hidden> */}
    </Card>
  )
}
