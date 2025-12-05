### Feeling Insane
The seasons change; the sun rises in the east; I'm making another version of my personal website. It's embarrassing to admit. Not so much the frequency, but the way I'm always convinced _this_ will be the one to rule them all. Then, I inevitably scrap it all and start again. This time I'm writing down my thoughts, so if nothing else, I can laugh at myself later.

### Problems In Past Iterations
A personal website has some clear functions:
- talk a bit about myself
- show off work
- have a list of other places on the net
- mix some magic into it all

Even though the objective is clear, there are many ways to do it, and thus many causes for consternation.

Before 2019, all of my personal websites were handwritten HTML. Steve Krug rightfully said "...even a site that doesn't need regular visitors needs some signs of life... to signal to me that it's not abandoned or hopelessly outdated."[^1] After some time as a back-end programmer, I understood how websites pull from data sources and generate HTML. By using that rather than handwritten HTML, it would be easy to keep the website fresh. I used a static site generator, which grabs the data and outputs files that can be hosted standalone on the web. The code can be found on Github for those interested.[^2]

The main problem with this approach was needing to manually enter in items and then publish for the changes to show. Even though it was much better than copy-pasting HTML, it turns out I still never wanted to do it.

Fast-forward to earlier this year and I began to consider the "links in bio"-style site as a role model. I realized if I couldn't update the site myself, I could at least link out to other places that would update from me living my life. As I worked on it, I decided to ditch the static site concept. Rather than serving dusty HTML files, there's a server constantly running and ready to return an HTML response with potentially brand new information. I was hesitant, because the big two reasons to use a static site are that it's faster and cheaper. Speed I realized didn't matter if the site wasn't interesting. For cost, I was starting to experiment with "scale-to-zero" hosts. These services will stop running your server when it isn't getting traffic and (hopefully) quickly turn it on to respond if needed. No traffic means no cost! Abandoning the static paradigm to get any sign of life, I figured I could show custom-formatted updates from the microblogging platform Mastodon. By using my phone, or linking certain platforms through a bot to make posts, pulses of activity would appear on the home page.

Alas, the same problem cropped up. I was much happier with the structure of the site, and the server hosting cost next to nothing, but the stale data remained. I don't microblog anyway! No dynamism here. On top of that, even though I was emphasizing external sites, it wasn't satisfying. It didn't feel personalized to have to go to my Github page, and then my Itch.io page, and then my Spotify page, and so on to get the tiniest bit of information.

### Why He's Different
As I was desperately working out how to connect various wells of my personality for bots to microblog, I eventually realized what should have been obvious the whole time: whatever platform I'm using for reading, code, music, etc. already has the means to grab that data! By utilizing something like Goodreads as I normally do it can show up on the site with just a small transformation. Suddenly there's a huge repository I can pull from in real time to make the site uniquely my own.

This latest iteration of my personal site revolves around leveraging the data I'm already creating and displaying it in an up-to-date, individualized way. What makes this possible is APIs and formats like RSS. Using these, computers easily talk to one another. Whereas a human using a browser is going to get all sorts of extra functionality, navigation, and styling, a computer only needs specific bare data. When someone visits my home page, rather than link to my Goodreads profile, I can request my current reading list from Goodreads and format a response for a section of my own website.

RSS feeds are collections of updates, but only contain minimal data about a specific topic (e.g. the titles of the books I'm reading, but not the genres). It's somewhat an ancient method of the web and has stuck around because it's simple and it works. On the other hand, APIs usually have a wider ability to get more general data (such as the genres of a specific book), and even create or update data, although I don't need that. By and large, platforms always have an API, because the platform itself is getting that data somehow and then integrating it with the user functionality and styling. However, it's not always the case that people can use a platform's API directly. In fact, it's getting rarer and rarer. Tom Scott has an excellent video on this subject.[^3] Goodreads had an API and [dropped support in December 2020](https://help.goodreads.com/s/article/Does-Goodreads-support-the-use-of-APIs). The Letterboxd process for requesting API access states a list of non-approved uses that as far as I can tell [encompasses every possible use](https://letterboxd.com/api-beta/). Four years after Scott's video, the rise of LLM companies engaging in [No-Face-magnitude](https://youtu.be/uahfu3NYrVo?si=6I7u-CTwKEZFn6oM) data ingestion will likely make the situation even worse. Platforms seem more willing to provide RSS feeds, which have been working well enough when there's no API.

While I was researching using RSS in 2024, I discovered the "Web Revival".[^4] After coming to understand the joy of an interoperable web through this personal site project, I find Web Revival extremely compelling. As the walls close in on major platforms, this movement is a glimmer of hope for the type of web I want to see.

I'm having a great time building out the site. Seeing it update in real time as I go about my life makes it feel so much more alive than any past iterations. I want to thank jae kaplan for showing how easy it is to use [HTMX on bearblog](https://jkap.io/using-htmx-on-bear) and having an excellent example of a social-update-aggregation feature. I'd also like to thank Christian for showing me bearblog and the aforementioned blog post. My focus for the code is a hacky attempt to get the ball rolling, but maybe in the future I can make a generalized tool out of it. The source code is being developed in public, even if it's not publicly useful out of the box.[^5] Fingers crossed this one sticks!

### References
[^1]: Krug, Steve. _Don't Make Me Think, Revisited_. (New Riders, 2014), 86
[^2]: <https://github.com/henrywebster/hwebs-info/>
[^3]: <https://youtu.be/BxV14h0kFs0?si=KJyJTfikJwVttkQh>
[^4]: <https://thoughts.melonking.net/guides/introduction-to-the-web-revival-1-what-is-the-web-revival>
[^5]: <https://git.sr.ht/~henz/chainmail>
