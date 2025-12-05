API_URL="https://api.github.com/graphql"

read -r -d '' QUERY <<'EOF'
{
    viewer {
        repositories(first: 5, privacy: PUBLIC, orderBy: {field: PUSHED_AT, direction: DESC}) {
            nodes {
                name
                url
                updatedAt
                defaultBranchRef {
                    target {
                        ... on Commit {
                            history(first: 5) {
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
EOF

# Make the API call
curl -s -X POST "$API_URL" \
  -H "Authorization: bearer $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg query "$QUERY" '{query: $query}')" 

