#!/usr/bin/env nu

open --raw /dev/stdin
| from csv --noheaders
| rename title slug date_created
| sort-by date_created --reverse
| to json
