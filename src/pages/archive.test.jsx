import React from "react"
import { render, screen } from "@testing-library/react"
import { useStaticQuery } from "gatsby"
import Archive from "./archive"

beforeEach(() => {
  jest.clearAllMocks()
})

describe("Archive", () => {
  test("has title", () => {
    useStaticQuery.mockImplementation(() => ({
      allProjectsJson: { nodes: [] },
      site: {
        siteMetadata: {},
      },
    }))

    render(<Archive />)
    expect(screen.getByText(/^Archive$/)).toHaveTextContent(/^Archive$/)
  })

  test("has projects", () => {
    useStaticQuery.mockImplementation(() => ({
      allProjectsJson: {
        nodes: [
          {
            title: "Time Machine",
          },
        ],
      },
      site: {
        siteMetadata: {},
      },
    }))
    render(<Archive />)
    expect(screen.getByText(/^Time Machine$/)).toHaveTextContent(
      /^Time Machine$/
    )
  })
})
