package db

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

// Db connection
func ConnectDatabase() (*mongo.Client, error) {
	// Client connection
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		log.Fatal(err)
	}

	// Max time to connect
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	// Check if the db is connect
	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal("Failed to connect to MongoDB: ", err)
	}

	return client, nil
}

// Get collection
func GetCollection(client *mongo.Client, Dbname, collectionName string) (*mongo.Collection, error) {
	// I create my database and collection (if not exist)
	coll := client.Database(Dbname).Collection(collectionName)

	fmt.Printf("Db obtained: %v\n", coll.Database().Name())
	fmt.Printf("Collection obtained: %v\n", coll.Name())
	return coll, nil
}
