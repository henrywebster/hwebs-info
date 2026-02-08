#!/usr/bin/env nu

http get https://status.cafe/users/henz/status.json 
| update content { |row| $row.content | recode html..ascii }
| to json
