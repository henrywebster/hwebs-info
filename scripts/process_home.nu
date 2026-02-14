#!/usr/bin/env nu

let page_name = "home"
let files = [".cache/hello.html", ".cache/why.html"]

{
    "page_name": $page_name,
    "hide_milton": false,
    "content": ($files | each { |f| open $f --raw })
}
| to json
