package repository

import (
	"github.com/leakyfontana/retrogram/internal/models"
	"gorm.io/gorm"
)

// ImageRepository handles database operations for images
type ImageRepository struct {
	db *gorm.DB
}

// NewImageRepository creates a new image repository with a database connection
func NewImageRepository(db *gorm.DB) *ImageRepository {
	return &ImageRepository{
		db: db,
	}
}

// FindAll retrieves all images from the database
func (r *ImageRepository) FindAll() ([]models.Image, error) {
	var images []models.Image
	result := r.db.Find(&images)
	return images, result.Error
}

// FindById retrieves an image by its ID
func (r *ImageRepository) FindById(id int64) (*models.Image, error) {
	var image models.Image
	result := r.db.First(&image, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &image, nil
}

// FindByFileName retrieves images by file name
func (r *ImageRepository) FindByFileName(fileName string) ([]models.Image, error) {
	var images []models.Image
	result := r.db.Where("file_name = ?", fileName).Find(&images)
	return images, result.Error
}

// FindByMediaType retrieves images by media type
func (r *ImageRepository) FindByMediaType(mediaType string) ([]models.Image, error) {
	var images []models.Image
	result := r.db.Where("media_type = ?", mediaType).Find(&images)
	return images, result.Error
}

// FindByLocation retrieves images by location
func (r *ImageRepository) FindByLocation(location string) ([]models.Image, error) {
	var images []models.Image
	result := r.db.Where("location = ?", location).Find(&images)
	return images, result.Error
}

// Save creates or updates an image in the database
func (r *ImageRepository) Save(image *models.Image) error {
	return r.db.Save(image).Error
}

// Delete removes an image from the database
func (r *ImageRepository) Delete(image *models.Image) error {
	return r.db.Delete(image).Error
} 