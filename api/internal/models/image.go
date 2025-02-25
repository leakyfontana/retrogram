package models

import (
	"time"
)

// Image represents an image entity stored in the database
type Image struct {
	ID        int64     `json:"id" gorm:"primaryKey;autoIncrement"`
	FileName  string    `json:"fileName" gorm:"column:file_name;not null"`
	ImageData []byte    `json:"imageData,omitempty" gorm:"column:image_data;not null;type:longblob"`
	MediaType string    `json:"mediaType" gorm:"column:media_type"`
	UploadedAt time.Time `json:"uploadedAt" gorm:"column:uploaded_at;not null"`
	Location   string    `json:"location" gorm:"column:location"`
}

// TableName specifies the database table name for the Image model
func (Image) TableName() string {
	return "image"
} 