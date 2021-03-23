import React from "react"
import { render, screen } from "@testing-library/react"
import { useStaticQuery } from "gatsby"
import Layout from "./layout"

beforeEach(() => {
  jest.clearAllMocks()
})

describe("Layout", () => {
  test("has title", () => {
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          title: "Henry J. Webster",
        },
      },
    }))

    render(<Layout location={{ pathname: "/" }} />)
    expect(screen.getByText(/^Henry J. Webster$/)).toHaveTextContent(
      /^Henry J. Webster$/
    )
  })

  test("title is link when pathname outside", () => {
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          title: "Henry J. Webster",
        },
      },
    }))

    render(<Layout location={{ pathname: "/404" }} />)
    expect(screen.getByText(/^Henry J. Webster$/)).toHaveAttribute(
      "href",
      "/#home"
    )
  })

  test("title is link to home", () => {
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          title: "Henry J. Webster",
        },
      },
    }))

    render(<Layout location={{ pathname: "/" }} />)
    expect(screen.getByText(/^Henry J. Webster$/)).toHaveAttribute(
      "href",
      "#home"
    )
  })

  test("has link to each main page section when on main page", () => {
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: { title: "My Website" },
      },
    }))

    render(<Layout location={{ pathname: "/" }} />)
    expect(screen.getByText(/^home$/)).toHaveAttribute("href", "#home")
    expect(screen.getByText(/^projects$/)).toHaveAttribute("href", "#projects")
    expect(screen.getByText(/^about$/)).toHaveAttribute("href", "#about")
  })

  test("section link exists when outside main page", () => {
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: { title: "My Website" },
      },
    }))

    render(<Layout location={{ pathname: "/404" }} />)
    expect(screen.getByText(/^home$/)).toHaveAttribute("href", "/#home")
    expect(screen.getByText(/^projects$/)).toHaveAttribute("href", "/#projects")
    expect(screen.getByText(/^about$/)).toHaveAttribute("href", "/#about")
  })

  test("has copyright", () => {
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          copyright: "2020 Henry J. Webster",
        },
      },
    }))

    render(<Layout location={{ pathname: "/" }} />)
    expect(screen.getByText(/^©2020 Henry J. Webster$/)).toBeTruthy()
  })

  test("has version", () => {
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          version: "0.0.0",
        },
      },
    }))

    render(<Layout location={{ pathname: "/" }} />)
    expect(screen.getByText(/^v0.0.0$/)).toBeTruthy()
  })

  test("has link to source code", () => {
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {},
      },
    }))

    render(<Layout location={{ pathname: "/" }} />)
    expect(screen.getByText(/Source on GitHub$/)).toHaveAttribute(
      "href",
      "https://github.com/henrywebster/hwebs-info"
    )
  })

  test("has link to open issue", () => {
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {},
      },
    }))

    render(<Layout location={{ pathname: "/" }} />)
    expect(screen.getByText(/Report an Issue$/)).toHaveAttribute(
      "href",
      "https://github.com/henrywebster/hwebs-info/issues"
    )
  })
})
