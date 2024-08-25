package com.retrogram.controller;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.Optional;

import com.google.cloud.storage.Blob;
import com.retrogram.entity.Image;
import com.retrogram.interfaces.ImageApi;
import com.retrogram.repository.ImageRepository;
import com.retrogram.util.ImageHelper;

import io.micronaut.http.HttpHeaders;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Part;
import io.micronaut.http.multipart.CompletedFileUpload;
import io.micronaut.http.server.types.files.StreamedFile;
import io.micronaut.http.server.util.HttpHostResolver;
import io.micronaut.http.uri.UriBuilder;
import io.micronaut.objectstorage.googlecloud.GoogleCloudStorageEntry;
import io.micronaut.objectstorage.googlecloud.GoogleCloudStorageOperations;
import io.micronaut.objectstorage.request.UploadRequest;
import io.micronaut.objectstorage.response.UploadResponse;
import io.micronaut.scheduling.annotation.ExecuteOn;
import io.micronaut.scheduling.TaskExecutors;

@Controller(ImageController.PREFIX)
@ExecuteOn(TaskExecutors.BLOCKING)
public class ImageController implements ImageApi {

    static final String PREFIX = "/images";

    private final GoogleCloudStorageOperations objectStorage;
    private final HttpHostResolver httpHostResolver;
    private final ImageRepository imageRepository;

    public ImageController(GoogleCloudStorageOperations objectStorage, HttpHostResolver httpHostResolver,
            ImageRepository imageRepository) {
        this.objectStorage = objectStorage;
        this.httpHostResolver = httpHostResolver;
        this.imageRepository = imageRepository;
    }

    @Override
    public HttpResponse<?> upload(@Part("imageName") String imageName,
            @Part("location") String location,
            @Part("uploadedAt") LocalDateTime uploadedAt,
            @Part("fileUpload") CompletedFileUpload fileUpload,
            HttpRequest<?> request) {
        String mediaType = fileUpload.getContentType().orElse(null).toString();
        String key = ImageHelper.buildKey(imageName, mediaType);

        // Upload image to object storage
        UploadRequest objectStorageUpload = UploadRequest.fromCompletedFileUpload(fileUpload, key);
        UploadResponse<Blob> response = objectStorage.upload(objectStorageUpload);

        // Save to database
        Image image = new Image(key, imageName, mediaType, uploadedAt,
                location);
        imageRepository.save(image);

        return HttpResponse
                .created(location(request, key))
                .header(HttpHeaders.ETAG, response.getETag());
    }

    private URI location(HttpRequest<?> request, String imageKey) {
        return UriBuilder.of(httpHostResolver.resolve(request))
                .path(PREFIX)
                .path(imageKey)
                .build();
    }

    @Override
    public Optional<HttpResponse<StreamedFile>> download(String imageKey) {
        return objectStorage.retrieve(imageKey)
                .map(ImageController::buildStreamedFile);
    }

    private static HttpResponse<StreamedFile> buildStreamedFile(GoogleCloudStorageEntry entry) {
        return ImageHelper.buildStreamedFile(entry);
    }

    @Override
    public void delete(String imageKey) {
        objectStorage.delete(imageKey);
    }
}