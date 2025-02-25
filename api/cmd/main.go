package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/leakyfontana/retrogram/internal/config"
	"github.com/leakyfontana/retrogram/internal/db"
	"github.com/leakyfontana/retrogram/internal/handler"
	"github.com/leakyfontana/retrogram/internal/repository"
	"github.com/leakyfontana/retrogram/internal/service"
)

func main() {
	// Connect to database
	database, err := config.ConnectDatabase()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Apply migrations
	if err := db.Migrate(database); err != nil {
		log.Fatalf("Failed to apply migrations: %v", err)
	}

	// Initialize repositories
	imageRepo := repository.NewImageRepository(database)

	// Initialize services
	imageService := service.NewImageService(imageRepo)

	// Initialize handlers
	imageHandler := handler.NewImageHandler(imageService)

	// Setup Gin router
	router := gin.Default()

	// Configure CORS
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Register routes
	imageHandler.RegisterRoutes(router)

	// Add health check endpoint
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "up",
		})
	})

	// Create HTTP server
	server := &http.Server{
		Addr:    ":8080",
		Handler: router,
	}

	// Start the server in a goroutine
	go func() {
		log.Println("Starting server on :8080")
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Failed to start server: %v", err)
		}
	}()

	// Wait for interrupt signal to gracefully shut down the server
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutting down server...")

	// Create a deadline to wait for
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Doesn't block if no connections, but will wait until the timeout deadline
	if err := server.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}

	log.Println("Server exited")
} 