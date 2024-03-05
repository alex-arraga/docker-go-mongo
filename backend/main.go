package main

import (
	"api/db"
	"fmt"
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

	fmt.Println("App in port 4000")

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hola mundo")
	})

	app.Get("/products", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"data": "productos desde backend",
		})
	})

	db.ConnectDatabase()

	app.Listen(":" + port)
}
