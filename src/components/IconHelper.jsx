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
      return <SiBandcamp />
    case "github":
      return <SiGithub />
    case "itchio":
      return (
        <SvgIcon>
          <FaItchIo />
        </SvgIcon>
      )
    case "open":
      return <MdOpenInNew />
    case "spotify":
      return <SiSpotify />
    default:
      return <MdBrokenImage />
  }
}
