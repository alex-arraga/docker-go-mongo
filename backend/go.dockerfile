# From golang image version 1.22.0
FROM golang:1.22.0

WORKDIR /app

COPY . .

# Download and install dependencies
RUN go get -d -v ./...

# Build the go app
RUN go build -o api .

# Port
EXPOSE 4000

CMD [ "./api" ]