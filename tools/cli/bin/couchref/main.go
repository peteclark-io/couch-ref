package main

import (
	"os"

	fixtures "github.com/peteclark-io/couch-ref/tools/cli/fixtures"
	"github.com/urfave/cli"
	"gopkg.in/urfave/cli.v1/altsrc"
)

func main() {
	app := cli.NewApp()
	app.Name = "couchref"
	app.Usage = "CLI for CouchRef"

	flags := []cli.Flag{
		altsrc.NewStringFlag(cli.StringFlag{
			Name:  "token",
			Usage: "Secret Firebase token.",
		}),
		altsrc.NewStringFlag(cli.StringFlag{
			Name:  "db",
			Usage: "Firebase DB name.",
		}),
		cli.StringFlag{
			Name:  "config",
			Value: "./config.yml",
			Usage: "Path to the YAML config file.",
		},
	}

	app.Version = version()
	app.Before = altsrc.InitInputSourceWithContext(flags, altsrc.NewYamlSourceFromFlagFunc("config"))
	app.Flags = flags

	app.Commands = []cli.Command{
		{
			Name:    "fixtures",
			Aliases: []string{"f"},
			Flags: []cli.Flag{
				cli.IntFlag{
					Name:  "m, matchday",
					Usage: "The matchday to query for.",
				},
			},
			Usage: "Query for fixtures for the provided matchday.",
			Action: func(c *cli.Context) error {
				matches, err := fixtures.ReadMatches(c.Int("matchday"))
				return err
			},
		},
	}

	app.Run(os.Args)
}

func version() string {
	v := os.Getenv("app_version")
	if v == "" {
		v = "v0.0.0"
	}
	return v
}
