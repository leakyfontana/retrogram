# Retrogram API

A Go-based image service API for the Retrogram application. This is a port of the original Micronaut Java service, now using MySQL instead of PostgreSQL.

## Features

- Upload images with metadata
- Retrieve images by ID
- List all images
- Delete images

## Technology Stack

- Go 1.21+
- Gin Web Framework
- GORM (Go Object Relational Mapper)
- MySQL

## Project Structure

```
.
├── cmd/                  # Application entry points
│   └── main.go           # Main application
├── internal/             # Private application code
│   ├── config/           # Configuration handling
│   │   └── mysql_config.go # MySQL configuration
│   ├── db/               # Database utilities
│   │   └── migration.go  # Database migrations
│   ├── handler/          # HTTP handlers (controllers)
│   │   └── image_handler.go  # Image API endpoints
│   ├── models/           # Data models
│   │   └── image.go      # Image data model
│   ├── repository/       # Data access layer
│   │   └── image_repository.go  # Database operations for images
│   └── service/          # Business logic
│       └── image_service.go  # Image business operations
├── .env                  # Environment variables
├── Dockerfile            # Container definition
├── go.mod                # Go module definition
└── README.md             # Documentation
```

## Prerequisites

- Go 1.21 or later
- MySQL 5.7 or later

## Configuration

The application uses environment variables for configuration. You can either set these in your environment or create a `.env` file in the project root.

Required environment variables:

```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_NAME=retrogram
DB_CHARSET=utf8mb4
DB_PARSE_TIME=True
DB_LOC=Local
PORT=8080
```

## Database Setup

1. Create a MySQL database:
   ```sql
   CREATE DATABASE retrogram CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. The application will automatically create the required tables on startup through GORM's auto-migration feature.

## Running Locally

1. Clone the repository
2. Set up your environment variables or create a `.env` file
3. Install dependencies:
   ```
   go mod download
   ```
4. Run the application:
   ```
   go run cmd/main.go
   ```

## API Endpoints

- `GET /images` - Get all images
- `GET /images/:id` - Get image by ID
- `GET /images/:id?download=true` - Download the image file
- `POST /images` - Upload a new image (multipart form)
- `DELETE /images/:id` - Delete an image

## Docker Support

Build the Docker image:

```
docker build -t retrogram-api .
```

Run the container:

```
docker run -p 8080:8080 --env-file .env retrogram-api
```

## Differences from Micronaut Version

- Uses Gin instead of Micronaut for the web framework
- Uses GORM instead of JPA for database access
- Simplified configuration with environment variables
- Uses MySQL instead of PostgreSQL
- Direct binary image storage in MySQL (no Google Cloud Storage)