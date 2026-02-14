#!/usr/bin/env nu

open --raw /dev/stdin
| from xml
| get content.0.content 
| where tag == "item" 
| each { |item| { 
        title: ($item.content | where tag == "title" | get 0.content.0.content) 
        author: ($item.content | where tag == "author_name" | get 0.content.0.content) 
        link: ($item.content | where tag == "link" | get 0.content.0.content)
    } 
}
| to json
