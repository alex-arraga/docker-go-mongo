package db

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type DatabaseCollections struct {
	Products *mongo.Collection
}

func ConnectDatabase() error {
	// Create client connection
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		return fmt.Errorf("failed to connect to db: %w", err)
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	// Check if the db is connect
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()
	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal("Failed to connect to MongoDB: ", err)
	}

	// I create my database (if not exist) and the collection
	coll := client.Database("my_database").Collection("products")

	// Insert bson data into collection created
	newData, err := coll.InsertOne(context.TODO(), bson.D{{
		Key: "name", Value: "laptop",
	}})
	if err != nil {
		return fmt.Errorf("failed to insert into db: %w", err)
	}

	fmt.Println("Insert db success: ", newData.InsertedID)
	return nil
}
