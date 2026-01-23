package main

import (
	"bufio"
	"encoding/csv"
	"encoding/json"
	"encoding/xml"
	"flag"
	"fmt"
	"html"
	"html/template"
	"io"
	"log"
	"os"
	"sort"
	"strings"
	"time"
)

func createTemplateFuncMap() template.FuncMap {
	return template.FuncMap{
		"formatDate": func(t time.Time) string {
			return t.Format("Jan 02, 2006")
		},
		"formatDatetime": func(t time.Time) string {
			return t.Format("Jan 02, 2006 15:04")
		},
		// for the nerds
		"formatHtmlDate": func(t time.Time) string {
			return t.Format("2006-01-02")
		},
		"formatHtmlDatetime": func(t time.Time) string {
			return t.Format("2006-01-02 15:04")
		},
	}
}

type PageData struct {
	PageName string
	Content  any
}

func parseTemplate(name string, filePaths ...string) *template.Template {
	return template.Must(template.New(name).Funcs(createTemplateFuncMap()).ParseFiles(filePaths...))
}

func renderHomePage(htmlFiles []string) error {
	templates := make([]template.HTML, len(htmlFiles))
	for i, filename := range htmlFiles {
		content, err := os.ReadFile(filename)
		if err != nil {
			return err
		}
		templates[i] = template.HTML(content)
	}

	tmpl := parseTemplate("", "templates/layout.tmpl", "templates/home.tmpl")
	pageData := PageData{"home", templates}
	err := tmpl.ExecuteTemplate(os.Stdout, "layout", pageData)
	if err != nil {
		return err
	}
	return nil
}

type Update struct {
	Message     string
	PublishedAt time.Time
}

func loadUpdates(filename string) ([]Update, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	reader := csv.NewReader(file)

	var updates []Update
	for {
		row, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, err
		}
		timestamp, err := time.Parse("2006-01-02 15:04:05", row[1])
		if err != nil {
			return nil, err
		}

		update := Update{
			Message:     row[0],
			PublishedAt: timestamp,
		}
		update.Message = html.UnescapeString(update.Message)
		updates = append(updates, update)
	}
	sort.Slice(updates, func(i, j int) bool {
		return updates[i].PublishedAt.After(updates[j].PublishedAt)
	})
	return updates, nil
}

func renderUpdates() error {
	updates, err := loadUpdates("data/updates.csv")
	if err != nil {
		return err
	}

	tmpl := parseTemplate("updates.tmpl", "templates/updates.tmpl")
	err = tmpl.Execute(os.Stdout, updates)
	if err != nil {
		return err
	}
	return nil
}

type PostInfo struct {
	Title     string
	Slug      string
	CreatedAt time.Time
}

func loadPosts(filename string) ([]PostInfo, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	reader := csv.NewReader(file)

	var posts []PostInfo
	for {
		row, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, err
		}
		timestamp, err := time.Parse("2006-01-02 15:04", row[2])
		if err != nil {
			return nil, err
		}

		post := PostInfo{
			Title:     row[0],
			Slug:      row[1],
			CreatedAt: timestamp,
		}
		posts = append(posts, post)
	}
	sort.Slice(posts, func(i, j int) bool {
		return posts[i].CreatedAt.After(posts[j].CreatedAt)
	})
	return posts, nil
}

func renderBlogPage() error {
	posts, err := loadPosts("data/posts.csv")
	if err != nil {
		return err
	}

	tmpl := parseTemplate("", "templates/layout.tmpl", "templates/blog.tmpl")
	pageData := PageData{"blog", posts}
	err = tmpl.ExecuteTemplate(os.Stdout, "layout", pageData)
	if err != nil {
		return err
	}
	return nil
}

type Post struct {
	Info    PostInfo
	Content template.HTML
}

func findPost(infos []PostInfo, slug string) (PostInfo, bool) {
	for _, p := range infos {
		if p.Slug == slug {
			return p, true
		}
	}
	return PostInfo{}, false
}

func renderPostPage(slug string) error {
	posts, err := loadPosts("data/posts.csv")
	if err != nil {
		return err
	}

	p, found := findPost(posts, slug)
	if !found {
		return fmt.Errorf("Couldn't find post `%s`", slug)
	}

	content, err := os.ReadFile(fmt.Sprintf(".cache/posts/%s.html", slug))
	if err != nil {
		return err
	}
	post := Post{Info: p, Content: template.HTML(content)}

	tmpl := parseTemplate("", "templates/layout.tmpl", "templates/post.tmpl")
	pageData := PageData{post.Info.Title, post}
	err = tmpl.ExecuteTemplate(os.Stdout, "layout", pageData)
	if err != nil {
		return err
	}
	return nil
}

type AtomFeed struct {
	XMLName xml.Name  `xml:"feed"`
	Xmlns   string    `xml:"xmlns,attr"`
	Title   string    `xml:"title"`
	ID      string    `xml:"id"`
	Updated string    `xml:"updated"`
	Link    []WebLink `xml:"link"`
	Author  *Author   `xml:"author,omitempty"`
	Entries []Entry   `xml:"entry"`
}

type Entry struct {
	Title   string        `xml:"title"`
	ID      string        `xml:"id"`
	Updated string        `xml:"updated"`
	Link    WebLink       `xml:"link"`
	Content template.HTML `xml:"content"`
}

type WebLink struct {
	Rel  string `xml:"rel,attr,omitempty"`
	Href string `xml:"href,attr"`
}

type Author struct {
	Name  string `xml:"name"`
	Email string `xml:"email,omitempty"`
}

func renderAtomFeed() error {
	posts, err := loadPosts("data/posts.csv")
	if err != nil {
		return err
	}

	// TODO put this data elsewhere
	author := Author{Name: "Henry J. Webster", Email: "henz.world.qv1ok@dralias.com"}
	links := []WebLink{{Href: "https://hwebs.info/blog/"}}
	var entries []Entry
	for _, post := range posts {
		content, err := os.ReadFile(fmt.Sprintf(".cache/posts/%s.html", post.Slug))
		if err != nil {
			return err
		}
		url := fmt.Sprintf("https://hwebs.info/blog/%s.html", post.Slug)

		var entry Entry
		entry.Title = post.Title
		entry.ID = url
		entry.Updated = post.CreatedAt.Format(time.RFC3339)
		entry.Link = WebLink{Href: url}
		entry.Content = template.HTML(content)

		entries = append(entries, entry)
	}

	feed := AtomFeed{
		Xmlns:   "http://www.w3.org/2005/Atom",
		Title:   "hwebs.info blog",
		ID:      "https://hwebs.info/blog",
		Updated: posts[0].CreatedAt.Format(time.RFC3339),
		Link:    links,
		Author:  &author,
		Entries: entries,
	}

	os.Stdout.WriteString(xml.Header)

	encoder := xml.NewEncoder(os.Stdout)

	if err := encoder.Encode(feed); err != nil {
		return err
	}

	return nil
}

func renderEtcPage(htmlFiles []string) error {

	templates := make([]template.HTML, len(htmlFiles))
	for i, filename := range htmlFiles {
		content, err := os.ReadFile(filename)
		if err != nil {
			return err
		}
		templates[i] = template.HTML(content)
	}

	tmpl := parseTemplate("", "templates/layout.tmpl", "templates/now.tmpl")
	pageData := PageData{"etc", templates}
	err := tmpl.ExecuteTemplate(os.Stdout, "layout", pageData)
	if err != nil {
		return err
	}
	return nil
}

type Commit struct {
	Message     string
	CommitURL   string
	RepoURL     string
	RepoName    string
	CommittedAt time.Time
}

func parseCommits(filename string) ([]Commit, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	reader := csv.NewReader(file)

	var commits []Commit
	for {
		row, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, err
		}
		timestamp, err := time.Parse(time.RFC3339, row[4])
		if err != nil {
			return nil, err
		}

		commit := Commit{
			Message:     row[0],
			CommitURL:   row[1],
			RepoURL:     row[2],
			RepoName:    row[3],
			CommittedAt: timestamp,
		}
		commits = append(commits, commit)
	}
	sort.Slice(commits, func(i, j int) bool {
		return commits[i].CommittedAt.After(commits[j].CommittedAt)
	})
	// TODO add max to config
	return commits[:5], nil
}

func renderNowPage(htmlFiles []string) error {
	templates := make([]template.HTML, len(htmlFiles))
	for i, filename := range htmlFiles {
		content, err := os.ReadFile(filename)
		if err != nil {
			return err
		}
		templates[i] = template.HTML(content)
	}

	tmpl := parseTemplate("", "templates/layout.tmpl", "templates/now.tmpl")
	pageData := PageData{"now", templates}
	err := tmpl.ExecuteTemplate(os.Stdout, "layout", pageData)
	if err != nil {
		return err
	}
	return nil
}

func renderCommits() error {
	commits, err := parseCommits(".cache/code.csv")
	if err != nil {
		return err
	}

	tmpl := parseTemplate("commits.tmpl", "templates/commits.tmpl")
	err = tmpl.Execute(os.Stdout, commits)
	if err != nil {
		return err
	}
	return nil
}

type Status struct {
	Author  string `json:"author"`
	Content string `json:"content"`
	Face    string `json:"face"`
	TimeAgo string `json:"timeAgo"`
}

func parseStatus(filename string) (*Status, error) {
	data, err := os.ReadFile(filename)
	if err != nil {
		return nil, err
	}

	var status Status
	err = json.Unmarshal(data, &status)
	if err != nil {
		return nil, err
	}

	status.Content = html.UnescapeString(status.Content)

	return &status, nil
}

func renderStatus() error {
	status, err := parseStatus(".cache/status.json")
	if err != nil {
		return err
	}

	tmpl := parseTemplate("status.tmpl", "templates/status.tmpl")
	err = tmpl.Execute(os.Stdout, status)
	if err != nil {
		return err
	}
	return nil
}

type BookFeed struct {
	Books []Book `xml:"channel>item"`
}

type Book struct {
	Title  string `xml:"title"`
	URL    string `xml:"link"`
	Author string `xml:"author_name"`
}

func parseReading(filename string) ([]Book, error) {
	data, err := os.ReadFile(filename)
	if err != nil {
		return nil, err
	}

	var feed BookFeed
	err = xml.Unmarshal(data, &feed)
	if err != nil {
		return nil, err
	}

	return feed.Books, nil
}

func renderReading() error {
	books, err := parseReading(".cache/reading.xml")
	if err != nil {
		return err
	}

	tmpl := parseTemplate("reading.tmpl", "templates/reading.tmpl")
	err = tmpl.Execute(os.Stdout, books)
	if err != nil {
		return err
	}
	return nil
}

type Movie struct {
	Title     string
	URL       string
	Year      string
	WatchedAt time.Time
}

func parseWatched(filename string) ([]Movie, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	decoder := xml.NewDecoder(file)
	var movies []Movie
	var current Movie
	var inItem bool

	for {
		token, err := decoder.Token()
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, err
		}

		switch se := token.(type) {
		case xml.StartElement:
			if se.Name.Local == "item" {
				inItem = true
				current = Movie{}
			} else if inItem {
				var content string
				decoder.DecodeElement(&content, &se)

				switch se.Name.Local {
				case "filmTitle":
					current.Title = content
				case "link":
					current.URL = content
				case "filmYear":
					current.Year = content
				case "watchedDate":
					t, err := time.Parse("2006-01-02", content)
					if err != nil {
						return nil, err
					}
					current.WatchedAt = t
				}
			}
		case xml.EndElement:
			if se.Name.Local == "item" {
				movies = append(movies, current)
				inItem = false
			}
		}
	}

	sort.Slice(movies, func(i, j int) bool {
		return movies[i].WatchedAt.After(movies[j].WatchedAt)
	})

	// TODO add to config
	return movies[:6], nil
}

func renderWatched() error {
	movies, err := parseWatched(".cache/watched.xml")
	if err != nil {
		return err
	}

	tmpl := parseTemplate("watched.tmpl", "templates/watched.tmpl")
	err = tmpl.Execute(os.Stdout, movies)
	if err != nil {
		return err
	}
	return nil
}

type Link struct {
	Service string
	URL     string
}

type Album struct {
	Name        string
	Cover       string
	ReleaseDate time.Time
	Links       []Link
}

type Artist struct {
	Name   string
	Albums []Album
}

func parseMusic(filename string) ([]Artist, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var artists []Artist

	scanner := bufio.NewScanner(file)
	currentArtist := Artist{}
	currentAlbum := Album{}
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())

		if line == "" {
			continue
		}

		parts := strings.SplitN(line, ":", 2)
		key := strings.TrimSpace(parts[0])
		value := strings.TrimSpace(parts[1])

		switch key {
		case "Artist":
			if currentArtist.Name != "" {
				currentArtist.Albums = append(currentArtist.Albums, currentAlbum)
				currentAlbum = Album{}
				artists = append(artists, currentArtist)
				currentArtist = Artist{}
			}
			currentArtist.Name = value
		case "Album":
			if currentAlbum.Name != "" {
				currentArtist.Albums = append(currentArtist.Albums, currentAlbum)
				currentAlbum = Album{}
			}
			currentAlbum.Name = value
		case "Date":
			// TODO handle err
			releaseDate, _ := time.Parse("2006-01-02", value)
			currentAlbum.ReleaseDate = releaseDate
		case "Link":
			parts := strings.SplitN(value, " ", 2)
			currentAlbum.Links = append(currentAlbum.Links, Link{Service: parts[0], URL: parts[1]})
		case "Cover":
			currentAlbum.Cover = value
		}

	}

	currentArtist.Albums = append(currentArtist.Albums, currentAlbum)
	artists = append(artists, currentArtist)

	return artists, nil
}

func renderMusic(filename string) error {
	artists, err := parseMusic(filename)
	if err != nil {
		return err
	}

	tmpl := parseTemplate("music.tmpl", "templates/music.tmpl")
	err = tmpl.Execute(os.Stdout, artists)
	if err != nil {
		return err
	}
	return nil
}

func main() {

	page := flag.String("page", "", "page to render")
	slug := flag.String("slug", "", "slug to render")
	flag.Parse()

	var err error
	switch *page {
	case "home":
		files := []string{".cache/hello.html", ".cache/why.html"}
		err = renderHomePage(files)
	case "etc":
		files := []string{".cache/music.html"}
		err = renderEtcPage(files)
	case "blog":
		err = renderBlogPage()
	case "post":
		// TODO error on empty string
		err = renderPostPage(*slug)
	case "now":
		files := []string{".cache/commits.html", ".cache/watched.html", ".cache/reading.html", ".cache/status.html"}
		err = renderNowPage(files)
	case "commits":
		err = renderCommits()
	case "status":
		err = renderStatus()
	case "reading":
		err = renderReading()
	case "watched":
		err = renderWatched()
	case "updates":
		err = renderUpdates()
	case "music":
		err = renderMusic("data/music.txt")
	case "feed":
		err = renderAtomFeed()
	default:
		err = fmt.Errorf("Unknown page: %s", *page)
	}

	if err != nil {
		log.Fatal(err)
	}
}
