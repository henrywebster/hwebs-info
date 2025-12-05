.data.viewer.repositories.nodes[] 
| . as $repo 
| .defaultBranchRef.target.history.nodes[] 
| {
    message: .messageHeadline, 
    commit_url: .commitUrl, 
    repo_url: $repo.url, 
    repo_name: $repo.name, 
    committed_date: .committedDate
  } 
| [.message, .commit_url, .repo_url, .repo_name, .committed_date] 
| @csv
