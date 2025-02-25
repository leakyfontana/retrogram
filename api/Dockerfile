FROM golang:1.21-alpine AS builder

WORKDIR /app

# Copy go.mod and go.sum
COPY go.mod .

# Install MySQL client
RUN apk add --no-cache build-base

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o retrogram ./cmd/main.go

# Create a minimal image for running the application
FROM alpine:latest

WORKDIR /app

# Install necessary runtime dependencies
RUN apk add --no-cache tzdata

# Copy the binary from the builder stage
COPY --from=builder /app/retrogram .
COPY --from=builder /app/.env .

# Expose port
EXPOSE 8080

# Run the application
CMD ["./retrogram"] 