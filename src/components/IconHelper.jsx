import React from "react"
import { SvgIcon } from "@material-ui/core"
import EmailIcon from "@material-ui/icons/Email"
import { FaItchIo } from "@react-icons/all-files/fa/FaItchIo"
import TwitterIcon from "@material-ui/icons/Twitter"
import GitHubIcon from "@material-ui/icons/GitHub"
import HomeIcon from "@material-ui/icons/Home"
import BuildIcon from "@material-ui/icons/Build"
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople"
import MenuIcon from "@material-ui/icons/Menu"
import BugReportIcon from "@material-ui/icons/BugReport"
import CodeIcon from "@material-ui/icons/Code"
import OpenInNewIcon from "@material-ui/icons/OpenInNew"
import { SiSpotify } from "@react-icons/all-files/si/SiSpotify"
import { SiBandcamp } from "@react-icons/all-files/si/SiBandcamp"
import BrokenImageIcon from "@material-ui/icons/BrokenImage"
// TODO: how to test this?

export default function IconHelper({ icon }) {
  switch (icon) {
    case "bandcamp":
      return <SiBandcamp />
    case "bug":
      return <BugReportIcon />
    case "build":
      return <BuildIcon />
    case "code":
      return <CodeIcon />
    case "email":
      return <EmailIcon />
    case "github":
      return <GitHubIcon />
    case "home":
      return <HomeIcon />
    case "itchio":
      return (
        <SvgIcon>
          <FaItchIo />
        </SvgIcon>
      )
    case "menu":
      return <MenuIcon />
    case "open":
      return <OpenInNewIcon />
    case "spotify":
      return <SiSpotify />
    case "twitter":
      return <TwitterIcon />
    case "wave":
      return <EmojiPeopleIcon />
    default:
      return <BrokenImageIcon />
  }
}
