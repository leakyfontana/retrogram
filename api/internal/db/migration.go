package db

import (
	"github.com/leakyfontana/retrogram/internal/models"
	"gorm.io/gorm"
)

// Migrate applies database migrations for all models
func Migrate(db *gorm.DB) error {
	// Auto-migrate the schema
	err := db.AutoMigrate(&models.Image{})
	if err != nil {
		return err
	}

	return nil
} 