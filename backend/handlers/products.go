package handlers

import (
	"api/db"
	"context"
	"encoding/json"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

// Logic POST
func InsertData(c *fiber.Ctx, coll *mongo.Collection) error {
	var products db.Products

	json.Unmarshal([]byte(c.Body()), &products)
	fmt.Printf("Products: %+v\n", products)

	newData, err := coll.InsertOne(context.TODO(), products)
	if err != nil {
		fmt.Printf("Error inserting document: %v\n", err)
		return c.Status(500).Send([]byte(err.Error()))
	}

	fmt.Printf("Inserted document with _id: %v\n", newData.InsertedID)

	response, _ := json.Marshal(newData)
	return c.Send(response)
}
