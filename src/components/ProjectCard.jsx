import React from "react"
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Typography,
  makeStyles,
  Chip,
  IconButton,
} from "@material-ui/core"
import IconHelper from "./IconHelper"

// TODO: this does nothing
// import theme from "../../theme"
// import Img from "gatsby-image"

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 440,
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
        {props.links.map(({ href, type }, index) => (
          <IconButton href={href} target="_blank" key={index}>
            <IconHelper icon={type} />
          </IconButton>
        ))}
      </CardActions>
    </Card>
  )
}
