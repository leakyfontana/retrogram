package handler

import (
	"fmt"
	"io"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/leakyfontana/retrogram/internal/service"
)

// ImageHandler handles HTTP requests for image operations
type ImageHandler struct {
	imageService *service.ImageService
}

// NewImageHandler creates a new image handler
func NewImageHandler(imageService *service.ImageService) *ImageHandler {
	return &ImageHandler{
		imageService: imageService,
	}
}

// RegisterRoutes registers all routes for the image handler
func (h *ImageHandler) RegisterRoutes(router *gin.Engine) {
	images := router.Group("/images")
	{
		images.GET("/", h.GetAll)
		images.GET("/:id", h.GetById)
		images.POST("/", h.Upload)
		images.DELETE("/:id", h.Delete)
	}
}

// GetAll returns all images
func (h *ImageHandler) GetAll(c *gin.Context) {
	images, err := h.imageService.GetAllImages()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Strip binary data from response to reduce payload size
	for i := range images {
		images[i].ImageData = nil
	}

	c.JSON(http.StatusOK, images)
}

// GetById returns an image by its ID
func (h *ImageHandler) GetById(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid image ID"})
		return
	}

	image, err := h.imageService.GetImageById(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "image not found"})
		return
	}

	// If a download parameter is provided, return the image file
	if c.Query("download") == "true" {
		c.Header("Content-Disposition", fmt.Sprintf("attachment; filename=%s", image.FileName))
		c.Data(http.StatusOK, image.MediaType, image.ImageData)
		return
	}

	c.JSON(http.StatusOK, image)
}

// Upload handles the upload of a new image
func (h *ImageHandler) Upload(c *gin.Context) {
	// Parse multipart form with 100MB max memory
	if err := c.Request.ParseMultipartForm(100 << 20); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get form values
	imageName := c.PostForm("imageName")
	location := c.PostForm("location")
	
	// Get file
	file, header, err := c.Request.FormFile("fileUpload")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "missing file"})
		return
	}
	defer file.Close()

	// Read file data
	fileData, err := io.ReadAll(file)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to read file"})
		return
	}

	// Get media type
	mediaType := header.Header.Get("Content-Type")

	// Create the image
	image, err := h.imageService.CreateImage(imageName, fileData, mediaType, location)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"id":       image.ID,
		"fileName": image.FileName,
	})
}

// Delete removes an image by its ID
func (h *ImageHandler) Delete(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid image ID"})
		return
	}

	err = h.imageService.DeleteImage(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "image not found"})
		return
	}

	c.Status(http.StatusNoContent)
} 