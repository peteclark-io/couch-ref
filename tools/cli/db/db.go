package db

import (
	"encoding/json"
	"os/exec"
)

type Firebase struct {
	AuthToken string
	Project   string
}

type DB interface {
	Write(path string, data interface{}) error
}

func (f Firebase) Write(path string, data interface{}) error {
	j, err := json.Marshal(data)
	if err != nil {
		return err
	}

	cmd := exec.Command("firebase --non-interactive --project " + f.Project + " --token " + f.AuthToken + " database:set -y " + path)
	cmd.StdinPipe().Write(j)

	cmd.Start()
}
