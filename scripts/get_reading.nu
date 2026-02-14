#!/usr/bin/env nu

(http get "https://www.goodreads.com/review/list_rss/159263337?key=qDjiqflyhso0h4tUk8bW2USB19csqQ3NW32j7SBIIf6FFVG8&shelf=currently-reading"
	--headers { "User-Agent": ($"($env.USER_AGENT)") }
)
| to xml
