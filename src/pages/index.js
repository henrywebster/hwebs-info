import React from "react"
import { Helmet } from "react-helmet"
import { Typography, Card, CardContent } from "@material-ui/core"

const Blurb = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h5" color="primary">
          Welcome 👋
        </Typography>
        <Typography
          variant="body1"
          component="span"
          color="textPrimary"
          gutterBottom
        >
          Henry J. Webster is a programmer in Brooklyn, NY. During daylight he
          builds financial web services. At night he experiments with game
          development, music, and 3D art.
        </Typography>
      </CardContent>
    </Card>
  )
}

export default function Home({ data }) {
  return (
    <>
      <Typography variant="h2" component="h2" color="primary">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home - Henry J Webster</title>
        </Helmet>
        I make technology that works.
      </Typography>
      <Blurb />
    </>
  )
}
