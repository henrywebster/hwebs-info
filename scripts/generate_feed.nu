#!/usr/bin/env nu

# TODO put this somewhere else
let base_url = "https://hwebs.info/blog"
let feed_title = "hwebs blog"
let author_name = "Henry J. Webster"

let entries = (
    open --raw /dev/stdin
    | from json
)

let last_updated = ($entries | first | get date_created)

let entry_xml = (
    $entries
    | each { |row|
        let datetime = ($row.date_created | str replace ' ' 'T' | $"($in):00Z")
        $"  <entry>
    <title>($row.title)</title>
    <link href=\"($base_url)/($row.slug).html\"/>
    <id>($base_url)/($row.slug)</id>
    <updated>($datetime)</updated>
    <content type=\"html\">($row.content)</content>
  </entry>"
    }
    | str join "\n"
)

$"<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>($feed_title)</title>
  <link href=\"($base_url)\" />
  <link href=\"($base_url)/feed.xml\" rel=\"self\" />
  <id>($base_url)/</id>
  <author>
    <name>($author_name)</name>
  </author>
  <updated>($last_updated | str trim | str replace ' ' 'T' | $"($in):00Z")</updated>
($entry_xml)
</feed>"
