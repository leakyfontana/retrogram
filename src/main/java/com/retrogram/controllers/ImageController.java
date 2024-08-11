package com.retrogram.controllers;

import java.net.URI;
import java.util.Optional;

import com.google.cloud.storage.Blob;
import com.retrogram.interfaces.ImageApi;

import io.micronaut.http.HttpHeaders;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.MediaType;
import io.micronaut.http.MutableHttpResponse;
import io.micronaut.http.annotation.Controller;
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

    public ImageController(GoogleCloudStorageOperations objectStorage, HttpHostResolver httpHostResolver) {
        this.objectStorage = objectStorage;
        this.httpHostResolver = httpHostResolver;
    }

    @Override
    public HttpResponse<?> upload(CompletedFileUpload fileUpload, String imageId, HttpRequest<?> request) {
        String key = buildKey(imageId);
        UploadRequest objectStorageUpload = UploadRequest.fromCompletedFileUpload(fileUpload, key);
        UploadResponse<Blob> response = objectStorage.upload(objectStorageUpload);

        return HttpResponse
                .created(location(request, imageId))
                .header(HttpHeaders.ETAG, response.getETag());
    }

    private static String buildKey(String imageId) {
        return imageId + ".jpg";
    }

    private URI location(HttpRequest<?> request, String imageId) {
        return UriBuilder.of(httpHostResolver.resolve(request))
                .path(PREFIX)
                .path(imageId)
                .build();
    }

    @Override
    public Optional<HttpResponse<StreamedFile>> download(String imageId) {
        String key = buildKey(imageId);
        return objectStorage.retrieve(key)
                .map(ImageController::buildStreamedFile);
    }

    private static HttpResponse<StreamedFile> buildStreamedFile(GoogleCloudStorageEntry entry) {
        Blob nativeEntry = entry.getNativeEntry();
        MediaType mediaType = MediaType.of(nativeEntry.getContentType());
        StreamedFile file = new StreamedFile(entry.getInputStream(), mediaType).attach(entry.getKey());
        MutableHttpResponse<Object> httpResponse = HttpResponse.ok()
                .header(HttpHeaders.ETAG, nativeEntry.getEtag());
        file.process(httpResponse);
        return httpResponse.body(file);
    }

    @Override
    public void delete(String imageId) {
        String key = buildKey(imageId);
        objectStorage.delete(key);
    }
}
