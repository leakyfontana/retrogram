package service

import (
	"errors"
	"fmt"
	"time"

	"github.com/leakyfontana/retrogram/internal/models"
	"github.com/leakyfontana/retrogram/internal/repository"
)

// ImageService handles the business logic for image operations
type ImageService struct {
	repo *repository.ImageRepository
}

// NewImageService creates a new image service
func NewImageService(repo *repository.ImageRepository) *ImageService {
	return &ImageService{
		repo: repo,
	}
}

// GetAllImages returns all images
func (s *ImageService) GetAllImages() ([]models.Image, error) {
	return s.repo.FindAll()
}

// GetImageById returns an image by its ID
func (s *ImageService) GetImageById(id int64) (*models.Image, error) {
	image, err := s.repo.FindById(id)
	if err != nil {
		return nil, fmt.Errorf("failed to find image: %w", err)
	}
	return image, nil
}

// CreateImage saves a new image
func (s *ImageService) CreateImage(fileName string, imageData []byte, mediaType string, location string) (*models.Image, error) {
	if fileName == "" {
		return nil, errors.New("file name is required")
	}

	if len(imageData) == 0 {
		return nil, errors.New("image data is required")
	}

	image := &models.Image{
		FileName:   fileName,
		ImageData:  imageData,
		MediaType:  mediaType,
		Location:   location,
		UploadedAt: time.Now(),
	}

	err := s.repo.Save(image)
	if err != nil {
		return nil, fmt.Errorf("failed to save image: %w", err)
	}

	return image, nil
}

// DeleteImage removes an image by its ID
func (s *ImageService) DeleteImage(id int64) error {
	image, err := s.repo.FindById(id)
	if err != nil {
		return fmt.Errorf("image not found: %w", err)
	}

	err = s.repo.Delete(image)
	if err != nil {
		return fmt.Errorf("failed to delete image: %w", err)
	}

	return nil
} 