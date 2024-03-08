package handlers

import (
	"api/db"
	"context"
	"encoding/json"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// GET All
func GetProducts(c *fiber.Ctx, coll *mongo.Collection) error {
	var allProducts []db.Products

	// Find all data on db, this return an array of bson
	cursor, err := coll.Find(context.TODO(), bson.M{})
	if err != nil {
		fmt.Printf("Error getting documents: %v\n", err)
		return c.Status(500).Send([]byte(err.Error()))
	}
	defer cursor.Close(context.TODO())

	// loops the array to get all data and save this in allProducts var
	for cursor.Next(context.TODO()) {
		var product db.Products
		cursor.Decode(&product)
		allProducts = append(allProducts, product)

		fmt.Printf("List of products: %v\n", product)
	}

	return c.JSON(&fiber.Map{
		"products": allProducts,
	})
}

// GET One
func GetProduct(c *fiber.Ctx, coll *mongo.Collection, id string) error {
	var product db.Products

	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(500).SendString("ID can't convert to primitive.ObjectID")
	}

	filter := bson.D{{Key: "_id", Value: objectId}}

	err = coll.FindOne(context.TODO(), filter).Decode(&product)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			fmt.Printf("No documents: %v\n", err.Error())
			return c.Status(500).SendString(err.Error())
		}
		panic(err)
	}

	return c.JSON(&fiber.Map{
		"product": product,
	})
}

// POST
func NewProduct(c *fiber.Ctx, coll *mongo.Collection) error {
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

// PUT
func UpdateProduct(c *fiber.Ctx, coll *mongo.Collection, id string) error {
	var productToUpdate db.Products

	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(500).SendString("ID can't convert to primitive.ObjectID")
	}
	filter := bson.D{{Key: "_id", Value: objectId}}

	json.Unmarshal([]byte(c.Body()), &productToUpdate)
	update := bson.M{"$set": bson.M{
		"name":  productToUpdate.Name,
		"cost":  productToUpdate.Cost,
		"brand": productToUpdate.Brand,
	}}

	productUpdated, err := coll.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		fmt.Printf("Error updating: %v\n", err)
		return c.Status(500).Send([]byte(err.Error()))
	}

	response, _ := json.Marshal(productUpdated)
	return c.Send(response)
}

// DELETE one
func DeleteProduct(c *fiber.Ctx, coll *mongo.Collection, id string) error {
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(500).SendString("ID can't convert to primitive.ObjectID")
	}
	filter := bson.D{{Key: "_id", Value: objectId}}

	result, err := coll.DeleteOne(context.TODO(), filter)
	if err != nil {
		panic(err)
	}

	response, _ := json.Marshal(result)
	return c.Send(response)
}
