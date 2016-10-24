package structs

type Match struct {
	Date     string `json:"date"`
	Matchday int    `json:"matchday"`
	Home     string `json:"homeTeamName"`
	Away     string `json:"awayTeamName"`
}
