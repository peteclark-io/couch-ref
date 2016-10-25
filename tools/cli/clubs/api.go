package clubs

import (
	"net/http"

	"github.com/peteclark-io/couch-ref/tools/cli/structs"
)

type Api interface {
	ReadClubs() (*[]structs.Club, error)
}

type Clubs struct {
	Client   *http.Client
	ClubsURL string
}

func (a Clubs) ReadClubs() (*[]structs.Club, error) {
	return a.readClubs()
}
