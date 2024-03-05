package db

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectDatabase() {
	// Create client connection
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb://localhost:27017"))

	if err != nil {
		println("🔴 Error: db connection")
		panic(err)
	}

	// If not exist, I create my database and the collection
	coll := client.Database("my_database").Collection("products")

	// Insert bson data into collection created
	coll.InsertOne(context.TODO(), bson.D{{
		Key: "name", Value: "mouse",
	}})

	fmt.Println("Operaciones en base de datos ejecutadas")
}

// For later use:

// type DatabaseCollections struct {
// 	Products *mongo.Collection
// }

// var Collections DatabaseCollections
// var Client *mongo.Client
