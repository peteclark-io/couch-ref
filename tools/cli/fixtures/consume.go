package fixtures

import (
	"encoding/json"

	"github.com/peteclark-io/couch-ref/tools/cli/structs"
)

func (a Fixtures) readFixtures(matchday int) (*[]structs.Fixture, error) {
	resp, err := a.Client.Get(a.FixturesURL)
	if err != nil {
		return nil, err
	}

	var fixtures []structs.Fixture
	decoder := json.NewDecoder(resp.Body)
	decoder.Decode(&fixtures)

	return &fixtures, nil
}
