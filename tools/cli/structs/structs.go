package structs

type Fixture struct {
	Id        string `json:"id"`
	Home      string `json:"home"`
	HomeScore int    `json:"home_score"`
	Away      string `json:"away"`
	AwayScore int    `json:"away_score"`
	KickOff   string `json:"kick_off"`
	Matchday  int    `json:"-"`
	Referee   string `json:"referee"`
}

type Club struct {
	Crest            string `json:"crestUrl"`
	SquadMarketValue string `json:"squadMarketValue"`
	ShortName        string `json:"shortName"`
	Name             string `json:"name"`
}
