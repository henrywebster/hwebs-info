API_URL="https://api.github.com/graphql"

read -r -d '' QUERY <<'EOF'
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
EOF

ESCAPED_QUERY=$(echo "$QUERY" | jq -Rs .)

VARIABLES='{"authorEmails": ["'"$GITHUB_EMAIL"'"]}'

curl -s -X POST "$API_URL" \
	-H "Authorization: bearer $GITHUB_TOKEN" \
	-H "Content-Type: application/json" \
	-d "$(jq -n --arg query "$QUERY" --argjson variables "$VARIABLES" '{query: $query, variables: $variables}')"
