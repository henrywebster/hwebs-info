import React from "react"
import { Typography, Divider, withStyles } from "@material-ui/core"

const styles = theme => ({
  titleMargin: {
    marginBottom: 75,
  },
})

const PageTitle = withStyles(styles)(({ classes, title }) => (
  <>
    <Typography variant="h2" component="h2" color="primary">
      {title}
    </Typography>
    <Divider className={classes.titleMargin} light />
  </>
))

export default PageTitle
