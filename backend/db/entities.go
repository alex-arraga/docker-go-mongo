package db

type Products struct {
	ID    string `json:"id,omitempty" bson:"_id,omitempty"`
	Name  string `json:"name" bson:"name"`
	Cost  int    `json:"cost" bson:"cost"`
	Brand string `json:"brand" bson:"brand"`
}
