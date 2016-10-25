package structs

type Fixture struct {
	Date     string `json:"date"`
	Matchday int    `json:"matchday"`
	Home     string `json:"homeTeamName"`
	Away     string `json:"awayTeamName"`
}

type Club struct {
	Crest            string `json:"crestUrl"`
	SquadMarketValue string `json:"squadMarketValue"`
	ShortName        string `json:"shortName"`
	Name             string `json:"name"`
}
