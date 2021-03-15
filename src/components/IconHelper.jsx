import React from "react"
import { SvgIcon } from "@material-ui/core"
import EmailIcon from "@material-ui/icons/Email"
import { FaItchIo } from "@react-icons/all-files/fa/FaItchIo"
import TwitterIcon from "@material-ui/icons/Twitter"
import GitHubIcon from "@material-ui/icons/GitHub"
// TODO: how to test this?

export default function IconHelper({ icon }) {
  switch (icon) {
    case "email":
      return <EmailIcon />
    case "github":
      return <GitHubIcon />
    case "itchio":
      return (
        <SvgIcon>
          <FaItchIo />
        </SvgIcon>
      )
    case "twitter":
      return <TwitterIcon />
  }
}
