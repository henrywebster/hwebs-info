
Writing code in my free time can feel like battling with myself.
I do it because I enjoy it, but I often get in my own way.
The main issue is treating personal code similarly to what I write professionally.
Some instincts that are important for professional work bring personal projects to a halt.
I'm working to reorient myself to viewing code written in my own time differently.
This way I can do, learn, and finish more.

## Definitions 
_personal code_ - software projects for satisfying an individual's urge to create, for whatever reason

_professional code_ - software projects for a large audience, often worked on by multiple people, that provide some value to end-users

## Rules

### 1. Assume no one else will ever see the code
This doesn't mean the code is unintelligible.
I still might have to understand code I wrote a week or a month or a year ago.
Like any kind of writing, we're going to change our approach depending on the audience.

Writing code professionally is like working on a textbook.
Everything should be spelled out and documented.
Newcomers can open a textbook to any section and be able to retrace information to understand.
In programming we do this with docs, comments, and logs.
These help a teammember who might have to change a part of the code they haven't touched yet.
While we get explainability and traceability, we also get heft.
Textbooks are big and tediously constructed.
Big and tedious is the enemy of personal code.

Writing personal code is like taking good notes.
It should be organized and thoughtful, but it shouldn't worry about the full context.
Shortcuts can be taken that wouldn't pass a textbook review board or a code review, and they should be used as much as possible.
The goal is to bring it to life, not to make its implementation understandable to everyone.

### 2. Assume no one else will ever use the code
Some common dangers:
- Supporting multiple
    - operating systems
    - databases
    - cloud providers
- Environment variables
- Command line arguments
- UI customization
- Nitpicking functionality

These can enable great usability, but they're often overkill for personal code.
Hardcode, hardcode, hardcode until there's no choice but to add that command line argument.
Professional code often has lots of optionality, because it's used by a diverse group that wants to work with a lot of knobs.
Personal code is likely only being used by one person, so we only add the knobs we absolutely need.
That frees time to work on core functionality and keeps code simple.

I almost named this rule "Don't think like a product owner."
Sometimes I get stuck spending time on "sharp edges" and minor annoyances that a product owner would bring up.
By assuming the only user is me, I don't lose focus and energy on productization side quests.

### 3. Don't worry about originality
"Don't reinvent the wheel" does not apply to personal code.

With professional code, we're expected to balance buying from a vendor vs. building ourselves.
Personal code has no such economic considersations.

I think the current culture is too prone to "yet another" critiques and pointing out how to do something in as few steps as possible.
It's powerful to be able to quickly and cheaply tie together off-the-shelf tech into something compelling, but we should still be able to do things the hard way and build what's already been built somewhere else.

It's a great way to practice and learn. 
Writers get better by writing but also by analyzing other work.
Recreating tech is like mapping out our favorite stories to understand how the author did their magic.
There might not be a market for our knock-off, but that isn't the point.

### 4. Don't spend more than 5 seconds on the name
The first name that comes to mind is probably the right one.

It's fun to think of names, but with personal code it's a waste of time.

## Closing Thoughts

These rules are coming from my own experience, which I'm not sure is very universal.
Plenty of folks only write professional code or personal code.
I'm a bit jealous of those only writing personal code, as I'm sure they get a lot more done.
Professional code is how I make a living, so I have to keep switching hats.
That being said, there's plenty I learn from professional code I can apply to personal code, and vice-versa.
Others might not have as hard a time moving between the two worlds.

### Should any personal code be public?
A common trigger for me professional-izing is when I make a git repo.
That generally means I'll be pushing it to GitHub.
Even though they've made private repos free, I still default to public so I can show people how much I'm coding.
In the end, it's a vain signal that doesn't mean much of anything.
Just because I'm writing code, shouldn't mean I have to share it to prove anything.

Still, personal code *can* be public without breaking the rules.
That's why I said "assume" no one will read it or use it.
Looking at each other's code is fun, especially when the project isn't commerical-grade.
It's one of the reasons I enjoy the folk art section of art museums.
Keeping in the back of my mind somebody might look at it is hard without clouding my judgement when coding, which is why I need the rules.

### Can personal code become professional code?
Plenty of software starts out to solve one person's needs and ends up solving a bunch of people's needs.
I don't think we should remotely assume this will be the case for our personal code.
If it ends up being so useful, it will probably need to be rewritten with this new goal in mind.
That shouldn't be difficult because personal code is by neccessity bare-bones.

It's possible a toy project can turn into a company or the next great open source tool, but try not to think about it too much!


