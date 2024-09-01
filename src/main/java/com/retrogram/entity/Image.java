package com.retrogram.entity;

import io.micronaut.data.annotation.GeneratedValue;
import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;
import jakarta.validation.constraints.NotNull;

import static io.micronaut.data.annotation.GeneratedValue.Type.AUTO;

import java.time.LocalDateTime;

@MappedEntity
public class Image {
    @Id
    @GeneratedValue(AUTO)
    private Long id;

    @NotNull
    private String file_path;

    @NotNull
    private String file_name;

    private String media_type;

    @NotNull
    private LocalDateTime uploaded_at;

    private String location;

    public Image(@NotNull String filePath, @NotNull String fileName, @NotNull String mediaType,
            @NotNull LocalDateTime uploadedAt, String location) {
        this.file_path = filePath;
        this.file_name = fileName;
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

    public String getFilePath() {
        return file_path;
    }

    public void setFilePath(String filePath) {
        this.file_path = filePath;
    }

    public String getFileName() {
        return file_name;
    }

    public void setFileName(String fileName) {
        this.file_name = fileName;
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
