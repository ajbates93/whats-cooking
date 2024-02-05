package main

import (
	"fmt"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	e.GET(("/"), func(e echo.Context) error {
		return e.String(200, "Hello world!")
	})

	fmt.Println("Starting Server...")
	e.Logger.Fatal(e.Start(":8080"))
}
