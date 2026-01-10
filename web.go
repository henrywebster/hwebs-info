package main

import (
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

func renderEtcPage() error {
	content := `
	{{define "content"}}
	<h1>Etc</h1>
	<img class="half-width" src="/static/building.webp" alt="Building under construction">
	<div class="half-width error">Work in progress.</div>
	{{end}}
	`

	tmpl := parseTemplate("", "templates/layout.tmpl")

	_, err := tmpl.Parse(content)
	if err != nil {
		return err
	}

	pageData := PageData{"etc", nil}
	err = tmpl.ExecuteTemplate(os.Stdout, "layout", pageData)
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
	return movies[:5], nil
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
		err = renderEtcPage()
	case "blog":
		err = renderBlogPage()
	case "post":
		// TODO error on empty string
		err = renderPostPage(*slug)
	case "now":
		files := []string{".cache/commits.html", ".cache/reading.html", ".cache/status.html", ".cache/watched.html"}
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
	default:
		err = fmt.Errorf("Unknown page: %s", *page)
	}

	if err != nil {
		log.Fatal(err)
	}
}
