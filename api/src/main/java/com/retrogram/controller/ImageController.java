package com.retrogram.controller;

import java.io.IOException;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.retrogram.entity.Image;
import com.retrogram.interfaces.ImageApi;
import com.retrogram.repository.ImageRepository;
import com.retrogram.util.ImageHelper;

import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Part;
import io.micronaut.http.annotation.Status;
import io.micronaut.http.multipart.CompletedFileUpload;
import io.micronaut.http.server.types.files.StreamedFile;
import io.micronaut.http.server.util.HttpHostResolver;
import io.micronaut.http.uri.UriBuilder;
import io.micronaut.objectstorage.googlecloud.GoogleCloudStorageEntry;
import io.micronaut.scheduling.annotation.ExecuteOn;
import io.micronaut.scheduling.TaskExecutors;

/**
 * Controller for handling image-related operations.
 * This controller implements the ImageApi interface and provides
 * functionality for uploading, downloading, and deleting images.
 */
@Controller(ImageController.PREFIX)
@ExecuteOn(TaskExecutors.BLOCKING)
public class ImageController implements ImageApi {

    static final String PREFIX = "/images";

    private final HttpHostResolver httpHostResolver;
    private final ImageRepository imageRepository;

    /**
     * Constructs a new ImageController with the necessary dependencies.
     *
     * @param objectStorage    The Google Cloud Storage operations object.
     * @param httpHostResolver The HTTP host resolver.
     * @param imageRepository  The repository for image data.
     */
    public ImageController(HttpHostResolver httpHostResolver,
            ImageRepository imageRepository) {
        this.httpHostResolver = httpHostResolver;
        this.imageRepository = imageRepository;
    }

    /**
     * Uploads an image file to the storage and saves its metadata to the database.
     *
     * @param imageName  The name of the image.
     * @param location   The location associated with the image.
     * @param uploadedAt The timestamp when the image was uploaded.
     * @param fileUpload The uploaded file.
     * @param request    The HTTP request.
     * @return An HTTP response indicating the result of the upload operation.
     */
    @Override
    public HttpResponse<?> upload(@Part("imageName") String imageName,
            @Part("location") String location,
            @Part("uploadedAt") LocalDateTime uploadedAt,
            @Part("fileUpload") CompletedFileUpload fileUpload,
            HttpRequest<?> request) {
        String mediaType = fileUpload.getContentType().orElse(null).toString();

        try {
            Image image = new Image(imageName, fileUpload.getBytes(), mediaType, uploadedAt,
                    location);
            imageRepository.save(image);
        } catch (IOException e) {
            e.printStackTrace();
            return HttpResponse.serverError(e.getMessage());
        }

        return HttpResponse
                .created(imageName);
    }

    /**
     * Retrieves an image by its ID from the repository.
     * 
     * @param imageId The ID of the image to retrieve.
     * @return {@link HttpResponse} containing the image if found (HTTP 200),
     *         or an HTTP 404 Not Found response if the image is not present.
     */
    @Override
    public HttpResponse<?> getById(Long imageId) {
        Optional<Image> imageOptional = imageRepository.findById(imageId);

        if (imageOptional.isPresent()) {
            // Return the found image wrapped in an OK response
            return HttpResponse.ok(imageOptional.get());
        } else {
            // Return a 404 Not Found response if the image isn't found
            return HttpResponse.notFound();
        }
    }

    @Override
    public HttpResponse<List<Image>> getAll() {
        List<Image> images = imageRepository.findAll();
        return HttpResponse.ok(images);
    }

    /**
     * Deletes an image file from the storage and its metadata from the database.
     *
     * @param imageKey The key of the image to delete.
     * @return HttpStatus.NO_CONTENT if successful, HttpStatus.NOT_FOUND if the
     *         image doesn't exist.
     */
    @Override
    @Status(HttpStatus.NO_CONTENT)
    public HttpStatus delete(Long imageId) {
        // First, check if the image exists in the database
        Optional<Image> imageOptional = imageRepository.findById(imageId);

        if (imageOptional.isPresent()) {

            // Delete from database
            imageRepository.delete(imageOptional.get());

            return HttpStatus.NO_CONTENT;
        } else {
            // Image not found
            return HttpStatus.NOT_FOUND;
        }
    }

    /**
     * Generates a URI for the uploaded image.
     *
     * @param request  The HTTP request.
     * @param imageKey The key of the uploaded image.
     * @return The URI of the uploaded image.
     */
    private URI location(HttpRequest<?> request, String imageKey) {
        return UriBuilder.of(httpHostResolver.resolve(request))
                .path(PREFIX)
                .path(imageKey)
                .build();
    }

    /**
     * Builds a StreamedFile response from a Google Cloud Storage entry.
     *
     * @param entry The Google Cloud Storage entry.
     * @return An HTTP response containing the streamed file.
     */
    private static HttpResponse<StreamedFile> buildStreamedFile(GoogleCloudStorageEntry entry) {
        return ImageHelper.buildStreamedFile(entry);
    }
}