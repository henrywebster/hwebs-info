#!/usr/bin/env nu

open --raw /dev/stdin
| from xml
| get content
| where tag == "channel"
| get 0.content
| where tag == "item"
| each {|item|
    let fields = $item.content
    {
        title: ($fields | where tag == "filmTitle" | get 0.content.0.content)
        link: ($fields | where tag == "link" | get 0.content.0.content)
        yearReleased: ($fields | where tag == "filmYear" | get 0.content.0.content)
        dateWatched: ($fields | where tag == "watchedDate" | get 0.content.0.content)
    }
}
| 
| sort-by dateWatched --reverse
| first 5
| to json
