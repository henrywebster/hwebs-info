import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  ProjectPreview,
  convertDate,
  convertGatsbyImageToSrc,
  convertFields,
} from "./project-preview"

describe("Project Preview", () => {
  test("renders a featured Project Card", () => {
    const featured = {
      title: "Time Machine",
      featured: true,
    }

    render(<ProjectPreview featured={featured} />)
    expect(screen.getByText(/Featured/)).toHaveTextContent(/Featured/)
  })

  test("renders no featured project when query has no featured", () => {
    const randoms = [
      {
        title: "Time Machine",
        featured: false,
      },
    ]

    render(<ProjectPreview randoms={randoms} />)
    expect(screen.queryByText(/Featured/)).toBeFalsy()
  })

  test("renders random project", () => {
    const randoms = [
      {
        title: "Time Machine",
        featured: false,
      },
    ]

    render(<ProjectPreview randoms={randoms} />)
    expect(screen.getByText(/Random/)).toHaveTextContent(/Random/)
  })

  test("renders no random project when query returns none", () => {
    const featured = {
      title: "Time Machine",
      featured: true,
    }

    render(<ProjectPreview featured={featured} />)
    expect(screen.queryByText(/Random/)).toBeFalsy()
  })

  test("change random projects after pressing shuffle button", () => {
    const randoms = [
      {
        title: "Time Machine",
        featured: false,
      },
      {
        title: "Dance Competition",
        featured: false,
      },
    ]

    render(<ProjectPreview randoms={randoms} />)

    let timeMachineProject = screen.queryByText(/Time Machine/)
    let danceProject = screen.queryByText(/Dance Competition/)

    userEvent.click(screen.getByText(/Shuffle/))

    if (!timeMachineProject) {
      timeMachineProject = screen.queryByText(/Time Machine/)
    } else if (!danceProject) {
      danceProject = screen.queryByText(/Dance Competition/)
    }

    expect(timeMachineProject).toBeTruthy()
    expect(danceProject).toBeTruthy()
  })

  test("cycles afrer pressing shuffle button", () => {
    const randoms = [
      {
        title: "Time Machine",
        featured: false,
      },
      {
        title: "Dance Competition",
        featured: false,
      },
    ]

    render(<ProjectPreview randoms={randoms} />)

    let timeMachineProject = screen.queryByText(/Time Machine/)
    let danceProject = screen.queryByText(/Dance Competition/)

    userEvent.click(screen.getByText(/Shuffle/))

    if (!timeMachineProject) {
      timeMachineProject = screen.queryByText(/Time Machine/)
      danceProject = undefined
    } else if (!danceProject) {
      danceProject = screen.queryByText(/Dance Competition/)
      timeMachineProject = undefined
    }

    userEvent.click(screen.getByText(/Shuffle/))

    if (!timeMachineProject) {
      timeMachineProject = screen.queryByText(/Time Machine/)
    } else if (!danceProject) {
      danceProject = screen.queryByText(/Dance Competition/)
    }

    expect(timeMachineProject).toBeTruthy()
    expect(danceProject).toBeTruthy()
  })
})

describe("Convert Date", () => {
  test("creates date object from ISO date string", () => {
    const date = convertDate("2021-03-26")
    expect(date.getUTCFullYear()).toStrictEqual(2021)
    expect(date.getUTCMonth()).toStrictEqual(3 - 1)
    expect(date.getUTCDate()).toStrictEqual(26)
  })
})

describe("Convert Gatsby Image to Src", () => {
  test("returns the src of a Gatsby Image GraphQL query", () => {
    const gatsbyImage = {
      childImageSharp: {
        gatsbyImageData: { images: { fallback: { src: "test.webp" } } },
      },
    }

    expect(convertGatsbyImageToSrc(gatsbyImage)).toStrictEqual("test.webp")
  })

  test("returns undefined when given undefined", () => {
    expect(convertGatsbyImageToSrc(undefined)).toBeUndefined()
  })
})

describe("Convert Fields", () => {
  test("converts startDate field to a Date object", () => {
    expect(convertFields({ startDate: "2021-03-26" }).startDate).toBeInstanceOf(
      Date
    )
  })

  test("converts endDate field to a Date object", () => {
    expect(convertFields({ endDate: "2021-03-26" }).endDate).toBeInstanceOf(
      Date
    )
  })

  // TODO: move to Project Card component?
  // How should I switch between CardMedia and GatsbyImage?
  // test("converts image based on input function", () => {
  //   expect(convertFields({ endDate: "2021-03-26" }).endDate).toBeInstanceOf(
  //     Date
  //   )
  // })
})
