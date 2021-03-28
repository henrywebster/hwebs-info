import React from "react"
import { SvgIcon } from "@material-ui/core"
import { FaItchIo } from "@react-icons/all-files/fa/FaItchIo"
import { SiGithub } from "@react-icons/all-files/si/SiGithub"
import { SiSpotify } from "@react-icons/all-files/si/SiSpotify"
import { SiBandcamp } from "@react-icons/all-files/si/SiBandcamp"
import { MdOpenInNew } from "@react-icons/all-files/md/MdOpenInNew"
import { MdBrokenImage } from "@react-icons/all-files/md/MdBrokenImage"

export default function IconHelper({ icon }) {
  switch (icon) {
    case "bandcamp":
      return (
        <SvgIcon titleAccess="Listen on Bandcamp">
          <SiBandcamp />
        </SvgIcon>
      )
    case "github":
      return (
        <SvgIcon alt="GitHub" titleAccess="View on GitHub">
          <SiGithub alt="GitHub" />
        </SvgIcon>
      )
    case "itchio":
      return (
        <SvgIcon titleAccess="Play on Itch.io">
          <FaItchIo />
        </SvgIcon>
      )
    case "open":
      return (
        <SvgIcon titleAccess="Open website">
          <MdOpenInNew />
        </SvgIcon>
      )
    case "spotify":
      return (
        <SvgIcon titleAccess="Listen on Spotify">
          <SiSpotify />
        </SvgIcon>
      )
    default:
      return (
        <SvgIcon titleAccess="">
          <MdBrokenImage />
        </SvgIcon>
      )
  }
}
