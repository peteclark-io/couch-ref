package clubs

import (
	"encoding/json"

	"github.com/peteclark-io/couch-ref/tools/cli/structs"
)

type clubResponse struct {
	Teams []structs.Club `json:"teams"`
}

func (c Clubs) readClubs() (*[]structs.Club, error) {
	resp, err := c.Client.Get(c.ClubsURL)
	if err != nil {
		return nil, err
	}

	var results clubResponse
	decoder := json.NewDecoder(resp.Body)
	err = decoder.Decode(&results)

	if err != nil {
		return nil, err
	}

	return &results.Teams, nil
}
