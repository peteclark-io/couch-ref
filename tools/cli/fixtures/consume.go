package fixtures

import (
	"encoding/json"

	"github.com/peteclark-io/couch-ref/tools/cli/structs"
)

type fixturesResponse struct {
	Fixtures []structs.Fixture `json:"fixtures"`
}

func (f Fixtures) readFixtures() (*[]structs.Fixture, error) {
	resp, err := f.Client.Get(f.FixturesURL)
	if err != nil {
		return nil, err
	}

	var results fixturesResponse
	decoder := json.NewDecoder(resp.Body)
	err = decoder.Decode(&results)

	if err != nil {
		return nil, err
	}

	return &results.Fixtures, nil
}
