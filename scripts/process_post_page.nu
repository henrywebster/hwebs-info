#!/usr/bin/env nu

def main [slug: string] {
    {
        "page_name": "hello",
        "hide_milton": false,
        "content": (
    open --raw /dev/stdin
    | from csv --noheaders
    | rename title slug date_created
    | where slug == $slug
    | first
    | insert content (
            open --raw $".cache/posts/($slug).html"
    )
    )
    }
    | to json
}
