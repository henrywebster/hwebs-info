#!/usr/bin/env nu

open --raw /dev/stdin
| from json
| get data.viewer.repositories.nodes
| where { |row| $row.defaultBranchRef != null }
| each {|repo|
    $repo.defaultBranchRef.target.history.nodes
    | each {|commit|
        {
            message: $commit.messageHeadline
            commit_url: $commit.commitUrl
            repo_url: $repo.url
            repo_name: $repo.name
            committed_date: $commit.committedDate
        }
    }
}
| flatten
| select message commit_url repo_url repo_name committed_date
| sort-by committed_date --reverse
| first 5
| to json
