package main

import (
	"fmt"
	"log"
	"whats-cooking/pkg/auth"
	"whats-cooking/pkg/database"
	"whats-cooking/pkg/router"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	// Load in .env file
	err := godotenv.Load("/Users/alexbates/repos/personal/whats-cooking/server/.env")

	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	fmt.Println("Initialising Database and running migrations...")
	database.InitDB()
	database.MigrateDB()
	gorm := database.DB()

	dbGorm, err := gorm.DB()
	if err != nil {
		log.Fatalf("Error getting database connection: %v", err)
	}

	dbGorm.Ping()
	fmt.Println("Database connection successful")

	fmt.Println("Building server...")
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	config := echojwt.Config{
		NewClaimsFunc: func(c echo.Context) jwt.Claims { return new(auth.Claims) },
		SigningKey:    []byte(auth.GetJWTSecret()),
		TokenLookup:   "cookie:access-token",
	}
	e.Use(echojwt.WithConfig(config))

	// Build routes...
	router.NewRouter(e)

	fmt.Println("Starting Server...")
	e.Logger.Fatal(e.Start(":8080"))
}
