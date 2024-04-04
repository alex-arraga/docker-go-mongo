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
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     "https://docker-go-mongo-frontend.onrender.com, http://localhost:3000",
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH",
		AllowHeaders:     "Origin, Content-Type, Accept",
	}))

	// port
	port := os.Getenv("API_PORT")
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

	// Products routers: Get all
	app.Get("/products", func(c *fiber.Ctx) error {
		return handlers.GetProducts(c, client.Database("my_database").Collection("products"))
	})

	// Get one
	app.Get("/products/:id", func(c *fiber.Ctx) error {
		return handlers.GetProduct(c, client.Database("my_database").Collection("products"), c.Params("id"))
	})

	// Create
	app.Post("/products", func(c *fiber.Ctx) error {
		return handlers.NewProduct(c, client.Database("my_database").Collection("products"))
	})

	// Update
	app.Put("/products/:id", func(c *fiber.Ctx) error {
		return handlers.UpdateProduct(c, client.Database("my_database").Collection("products"), c.Params("id"))
	})

	// Delete all
	app.Delete("/products", func(c *fiber.Ctx) error {
		return handlers.DeleteProducts(c, client.Database("my_database").Collection("products"))
	})

	// Delete one
	app.Delete("/products/:id", func(c *fiber.Ctx) error {
		return handlers.DeleteProduct(c, client.Database("my_database").Collection("products"), c.Params("id"))
	})

	fmt.Println("App in port 4000")
	app.Listen("0.0.0.0:" + port)
}
