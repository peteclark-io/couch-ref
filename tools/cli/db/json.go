package db

import (
	"encoding/json"

	"github.com/peteclark-io/couch-ref/tools/cli/structs"
)

func AsFixture(data []byte, err error) ([]structs.Fixture, error) {
	var fixtures []structs.Fixture
	if err != nil {
		return fixtures, err
	}

	err = json.Unmarshal(data, &fixtures)
	return fixtures, err
}

func AsClub(data []byte, err error) ([]structs.Club, error) {
	var clubs []structs.Club
	if err != nil {
		return clubs, err
	}

	err = json.Unmarshal(data, &clubs)
	return clubs, err
}
