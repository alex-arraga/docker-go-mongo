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
		return handlers.GetProducts(c, client.Database("my_database").Collection("products"))
	})

	app.Post("/products", func(c *fiber.Ctx) error {
		return handlers.NewProduct(c, client.Database("my_database").Collection("products"))
	})

	fmt.Println("App in port 4000")
	app.Listen(":" + port)
}
