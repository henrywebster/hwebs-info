
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
else
  echo "Error: .env file not found"
  exit 1
fi

# Check if GITHUB_TOKEN is set
if [ -z "$GITHUB_TOKEN" ]; then
  echo "Error: GITHUB_TOKEN not found in .env file"
  exit 1
fi

# GitHub GraphQL API endpoint
API_URL="https://api.github.com/graphql"

# GraphQL query - this example fetches viewer (authenticated user) info
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

