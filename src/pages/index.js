import React from "react"
import { Helmet } from "react-helmet"
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  withStyles,
  Grid,
  Box,
  Paper,
} from "@material-ui/core"
import { DiJava } from "@react-icons/all-files/di/DiJava"
import { SiJavascript } from "@react-icons/all-files/si/SiJavascript"
import { SiReact } from "@react-icons/all-files/si/SiReact"
import { SiSpring } from "@react-icons/all-files/si/SiSpring"
import { SiSpinnaker } from "@react-icons/all-files/si/SiSpinnaker"
import { SiBlender } from "@react-icons/all-files/si/SiBlender"
import { FaAws } from "@react-icons/all-files/fa/FaAws"
import { SiGodotengine } from "@react-icons/all-files/si/SiGodotengine"
import PageTitle from "../components/pageTitle"

const styles = theme => ({
  techItem: {
    // maxWidth: 100,
    padding: 10,
    margin: 10,
    backgroundColor: theme.palette.secondary.main,
  },
  techIcon: {
    fontSize: "3em",
    lineHeight: 0.5,
  },
})

const Blurb = () => {
  return (
    <Card>
      <CardHeader title="Welcome" titleTypographyProps={{ color: "primary" }} />
      <CardContent>
        <Typography
          variant="body1"
          component="span"
          color="textPrimary"
          gutterBottom
        >
          My name is Henry J. Webster, a programmer in Brooklyn, NY. <br />
          <br />
          🌞 During daylight I build financial web services. <br />
          🌜 At night I experiment with game development, music, and 3D art.
        </Typography>
      </CardContent>
    </Card>
  )
}

const Rundown = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h5" color="primary">
          Technlogies 👷
        </Typography>
        <TechCategory
          category="Languages"
          items={[
            <TechItem name="Java" icon={<DiJava />} />,
            <TechItem name="JavaScript" icon={<SiJavascript />} />,
          ]}
        />
        <TechCategory
          category="Frameworks"
          items={[
            <TechItem name="React" icon={<SiReact />} />,
            <TechItem name="Spring" icon={<SiSpring />} />,
          ]}
        />
        <TechCategory
          category="Platforms"
          items={[<TechItem name="AWS" icon={<FaAws />} />]}
        />
        <TechCategory
          category="Tools"
          items={[
            <TechItem name="Spinnaker" icon={<SiSpinnaker />} />,
            <TechItem name="Blender" icon={<SiBlender />} />,
            <TechItem name="Godot Engine" icon={<SiGodotengine />} />,
          ]}
        />
      </CardContent>
    </Card>
  )
}

const TechItem = withStyles(styles)(({ classes, name, icon }) => (
  <Box className={classes.techItem} borderRadius={8}>
    <Grid container alignItems="center" direction="column">
      <Grid item className={classes.techIcon}>
        {icon}
      </Grid>
      <Grid item>
        <Typography variant="subtitle1" component="span">
          {name}
        </Typography>
      </Grid>
    </Grid>
  </Box>
))

const TechCategory = withStyles(styles)(({ classes, category, items }) => (
  <>
    <Typography variant="subtitle1" component="span">
      {category}
    </Typography>
    <Divider />
    <Grid container>
      {items.map(item => (
        <Grid item>{item}</Grid>
      ))}
    </Grid>
  </>
))

export default function Home({ data }) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home - Henry J Webster</title>
      </Helmet>
      <PageTitle title="Home" />
      {/* <Typography variant="h2" component="h2" color="primary">

        I make technology that works.
      </Typography> */}
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Blurb />
        </Grid>
        <Grid item>
          <Rundown />
        </Grid>
      </Grid>
    </>
  )
}
