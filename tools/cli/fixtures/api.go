package matches

import (
	"net/url"

	"github.com/peteclark-io/couch-ref/tools/cli/structs"
)

// Config set the match API data for the package
var Config *Api

// Api urls for retrieving data
type Api struct {
	MatchURL *url.URL
}

func init() {
	Config = &Api{
		MatchURL: parseURL("http://api.football-data.org/v1/competitions/426/fixtures"),
	}
}

func parseURL(parse string) *url.URL {
	uri, err := url.Parse(parse)
	if err != nil {
		panic(err)
	}
	return uri
}

func ReadMatches(matchday int) []structs.Match, error {
	return []structs.Match{}, nil
}
