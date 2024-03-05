package db

type Products struct {
	ID    string `json:"id,omitempty" bson:"_id,omitempty"`
	Name  string `json:"name" bson:"name"`
	Cost  string `json:"cost" bson:"cost"`
	Brand int    `json:"brand" bson:"brand"`
}
