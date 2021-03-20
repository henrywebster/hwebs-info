import React from "react"
import { render, screen } from "@testing-library/react"
import ProjectCard from "./project-card"

describe("Project Card", () => {
  test("has title", () => {
    render(<ProjectCard title="Time Machine" date={new Date(1995, 11, 16)} />)
    expect(screen.getByText(/^Time Machine$/)).toHaveTextContent(
      /^Time Machine$/
    )
  })

  test("has year", () => {
    render(<ProjectCard title="Time Machine" date={new Date(1995, 11, 16)} />)
    expect(screen.getByText(/1995/)).toHaveTextContent(/^1995$/)
  })
  test("has description", () => {
    render(
      <ProjectCard
        title="Time Machine"
        date={new Date(1995, 11, 16)}
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
        date={new Date(1995, 11, 16)}
        links={[{ href: "hwebs.info", icon: "open" }]}
      />
    )
    expect(screen.getAllByRole("link")).toHaveLength(1)
  })
})
