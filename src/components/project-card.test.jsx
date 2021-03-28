import React from "react"
import { render, screen } from "@testing-library/react"
import ProjectCard from "./project-card"

describe("Project Card", () => {
  test("has title", () => {
    render(
      <ProjectCard title="Time Machine" endDate={new Date(1995, 11, 16)} />
    )
    expect(screen.getByText(/^Time Machine$/)).toHaveTextContent(
      /^Time Machine$/
    )
  })

  test("has year", () => {
    render(
      <ProjectCard title="Time Machine" endDate={new Date(1995, 11, 16)} />
    )
    expect(screen.getByText(/1995/)).toHaveTextContent(/^1995$/)
  })
  test("has description", () => {
    render(
      <ProjectCard
        title="Time Machine"
        endDate={new Date(1995, 11, 16)}
        description="I built a time machine with Uncle Rico and Kip."
      />
    )
    expect(screen.getByText(/Uncle Rico/)).toHaveTextContent(
      /^I built a time machine with Uncle Rico and Kip.$/
    )
  })
  test("has links", () => {
    render(
      <ProjectCard
        title="Time Machine"
        endDate={new Date(1995, 11, 16)}
        links={[{ href: "hwebs.info", icon: "open" }]}
      />
    )
    expect(screen.getAllByRole("link")).toHaveLength(1)
  })

  // TODO: make image a requirement to prevent SSR issues
  test("has no image when given no image prop", () => {
    render(
      <ProjectCard title="Time Machine" endDate={new Date(1995, 11, 16)} />
    )
    expect(screen.queryByRole("img")).toBeFalsy()
  })
  test("has image when given image prop", () => {
    render(
      <ProjectCard
        title="Time Machine"
        endDate={new Date(1995, 11, 16)}
        image="test.webp"
      />
    )
    expect(screen.getByRole("img")).toBeTruthy()
  })

  test("has date range when years are different", () => {
    render(
      <ProjectCard
        title="Time Machine"
        startDate={new Date(1995, 11, 16)}
        endDate={new Date(1996, 1, 1)}
      />
    )
    expect(screen.getByText(/1995 - 1996/)).toBeTruthy()
  })

  test("does not have date range when years are same", () => {
    render(
      <ProjectCard
        title="Time Machine"
        startDate={new Date(1995, 11, 16)}
        endDate={new Date(1995, 11, 31)}
      />
    )
    expect(screen.getByText(/1995/)).toHaveTextContent(/^1995$/)
  })
})
