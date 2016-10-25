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
	return &[]structs.Fixture{}, nil
}
