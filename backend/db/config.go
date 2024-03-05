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

type DatabaseCollections struct {
	Products *mongo.Collection
}

// Db connection
func ConnectDatabase() (*mongo.Client, error) {
	// Client connection
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		log.Fatal(err)
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

	return client, nil
}

// Get collection
func GetCollection(Dbname, collectionName string) (*mongo.Collection, error) {
	// I create my database and collection (if not exist)
	client, err := ConnectDatabase()
	if err != nil {
		log.Fatal(err)
	}
	coll := client.Database(Dbname).Collection(collectionName)

	fmt.Println("Db obtained: ", coll.Database().Name())
	fmt.Println("Collection obtained: ", coll.Name())
	return coll, nil
}
