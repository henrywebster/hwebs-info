import React from "react"
import { ListItem, Typography } from "@material-ui/core"

export default function Footer({ buttons = [], notices = [] }) {
  const noticeList = notices.map((item, index) => (
    <ListItem key={index}>
      <Typography variant="subtitle2">{item}</Typography>
    </ListItem>
  ))

  return (
    <>
      {buttons}
      {noticeList}
    </>
  )
}
