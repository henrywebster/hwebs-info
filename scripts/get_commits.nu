#!/usr/bin/env nu

let query = '
  query($authorEmails: [String!]!) {
    viewer {
      repositories(first: 5, privacy: PUBLIC, orderBy: {field: PUSHED_AT, direction: DESC}) {
        nodes {
          name
          url
          updatedAt
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: 5, author: {emails: $authorEmails}) {
                  nodes {
                    messageHeadline
                    committedDate
                    commitUrl
                  }
                }
              }
            }
          }
        }
      }
    }
  }
'

let variables = {authorEmails:[$"($env.GITHUB_EMAIL)"]}

(http post https://api.github.com/graphql
	--headers { Authorization: $"Bearer ($env.GITHUB_TOKEN)" }
	--content-type application/json
	{ query: $query, variables: $variables }
)
| to json
