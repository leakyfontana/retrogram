package com.retrogram.interfaces;

import java.time.LocalDateTime;

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

public interface ImageApi {

    @Post(value = "/", consumes = MediaType.MULTIPART_FORM_DATA)
    HttpResponse upload(@Part("imageName") String imageName,
            @Part("location") String location,
            @Part("uploadedAt") LocalDateTime uploadedAt,
            @Part("fileUpload") CompletedFileUpload fileUpload,
            HttpRequest<?> request);

    @Get(value = "/")
    HttpResponse getAll();

    @Get(value = "/{imageId}")
    HttpResponse getById(Long imageId);

    @Status(HttpStatus.NO_CONTENT)
    @Delete("/{imageId}")
    HttpStatus delete(Long imageId);
}