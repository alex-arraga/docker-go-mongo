package db

import (
	"context"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Db connection
func ConnectDatabase() (*mongo.Client, error) {
	// Config client db connect
	connectionDb := os.Getenv("DATABASE_URL")
	println("DB Env GO " + connectionDb)
	if connectionDb == "" {
		connectionDb = "http://localhost:4000"
	}

	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(connectionDb).SetServerAPIOptions(serverAPI)

	// Client connection
	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		log.Fatal(err)
	}

	// Send a ping to confirm a successful connection
	if err := client.Database("admin").RunCommand(context.TODO(), bson.D{{Key: "ping", Value: 1}}).Err(); err != nil {
		panic(err)
	}
	fmt.Println("Pinged your deployment. Successfully connection to MongoDB!")

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
