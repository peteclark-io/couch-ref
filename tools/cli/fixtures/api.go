package fixtures

import (
	"net/http"

	"github.com/peteclark-io/couch-ref/tools/cli/structs"
)

type Api interface {
	ReadFixtures(matchday int) (*[]structs.Fixture, error)
}

type Fixtures struct {
	Client      *http.Client
	FixturesURL string
}

func (f Fixtures) ReadFixtures(matchday int) (*[]structs.Fixture, error) {
	all, err := f.readFixtures()
	if err != nil {
		return nil, err
	}

	filtered := make([]structs.Fixture, 0)
	for _, fixture := range *all {
		if fixture.Matchday == matchday {
			filtered = append(filtered, fixture)
		}
	}

	return &filtered, nil
}
