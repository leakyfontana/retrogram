package com.retrogram.entity;

import io.micronaut.data.annotation.GeneratedValue;
import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;
import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.NotNull;

import static io.micronaut.data.annotation.GeneratedValue.Type.AUTO;

import java.time.LocalDateTime;

@Serdeable
@MappedEntity
public class Image {
    @Id
    @GeneratedValue(AUTO)
    private Long id;

    @NotNull
    private String file_name;

    @NotNull
    private byte[] image_data;

    private String media_type;

    @NotNull
    private LocalDateTime uploaded_at;

    private String location;

    public Image(@NotNull String fileName, @NotNull byte[] imageData, @NotNull String mediaType,
            @NotNull LocalDateTime uploadedAt, String location) {
        this.file_name = fileName;
        this.image_data = imageData;
        this.media_type = mediaType;
        this.uploaded_at = uploadedAt;
        this.location = location;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return file_name;
    }

    public void setFileName(String fileName) {
        this.file_name = fileName;
    }

    public byte[] getImageData() {
        return image_data;
    }

    public void setImageData(byte[] imageData) {
        this.image_data = imageData;
    }

    public String getMediaType() {
        return media_type;
    }

    public void setMediaType(String mediaType) {
        this.media_type = mediaType;
    }

    public LocalDateTime getUploadedAt() {
        return uploaded_at;
    }

    public void setUploadedAt(LocalDateTime uploadedAt) {
        this.uploaded_at = uploadedAt;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
