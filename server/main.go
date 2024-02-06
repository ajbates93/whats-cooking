package main

import (
	"fmt"
	"log"
	"whats-cooking/pkg/database"
	"whats-cooking/pkg/router"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
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

	// Build routes...
	router.NewRouter(e)

	fmt.Println("Starting Server...")
	e.Logger.Fatal(e.Start(":8080"))
}
