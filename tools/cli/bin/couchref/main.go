package main

import (
	"os"

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

	app.Action = func(ctx *cli.Context) {

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
