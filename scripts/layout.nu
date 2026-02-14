#!/usr/bin/env nu

def main [
    --page-name: string,
    --hide-milton,
    ...files: string
] {
    {
        "page_name": $page_name,
        "hide_milton": $hide_milton,
        "content": ($files | each { |f| open $f --raw })
    }
    | to json
}
