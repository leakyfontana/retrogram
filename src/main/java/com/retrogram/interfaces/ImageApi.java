package com.retrogram.interfaces;

import java.time.LocalDateTime;
import java.util.Optional;

import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Part;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Status;
import io.micronaut.http.multipart.CompletedFileUpload;
import io.micronaut.http.server.types.files.StreamedFile;

public interface ImageApi {

    @Post(value = "/", consumes = MediaType.MULTIPART_FORM_DATA)
    HttpResponse upload(@Part("imageName") String imageName,
            @Part("location") String location,
            @Part("uploadedAt") LocalDateTime uploadedAt,
            @Part("fileUpload") CompletedFileUpload fileUpload,
            HttpRequest<?> request);

    @Get("/{imageKey}")
    Optional<HttpResponse<StreamedFile>> download(String imageKey);

    @Status(HttpStatus.NO_CONTENT)
    @Delete("/{imageKey}")
    HttpStatus delete(String imageKey);
}