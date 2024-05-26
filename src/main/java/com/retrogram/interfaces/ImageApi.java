package com.retrogram.interfaces;

import java.util.Optional;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Status;
import io.micronaut.http.multipart.CompletedFileUpload;
import io.micronaut.http.server.types.files.StreamedFile;

public interface ImageApi {

    @Post(uri = "/{imageId}", consumes = MediaType.MULTIPART_FORM_DATA) 
    HttpResponse upload(CompletedFileUpload fileUpload, String imageId, HttpRequest<?> request);

    @Get("/{imageId}") 
    Optional<HttpResponse<StreamedFile>> download(String imageId);

    @Status(HttpStatus.NO_CONTENT) 
    @Delete("/{imageId}") 
    void delete(String imageId);
}