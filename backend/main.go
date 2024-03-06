package main

import (
	"api/db"
	"api/handlers"
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()
	app.Use(cors.New())

	// port
	port := os.Getenv("PORT")
	if port == "" {
		port = "4000"
	}

	// create mongodb client
	client, err := db.ConnectDatabase()
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(context.TODO())

	// HTTP methods - CRUD
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hola mundo")
	})

	app.Get("/products", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Get request",
		})
	})

	app.Post("/products", func(c *fiber.Ctx) error {
		return handlers.InsertData(c, client.Database("my_database").Collection("products"))
	})

	fmt.Println("App in port 4000")
	app.Listen(":" + port)
}
