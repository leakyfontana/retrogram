package com.retrogram.controllers;

import io.micronaut.core.io.ResourceResolver;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Produces;

import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Optional;

@Controller
public class ImageController {
    private final ResourceResolver resourceResolver;

    public ImageController(ResourceResolver resourceResolver) {
        this.resourceResolver = resourceResolver;
    }

    @Get("/images/{imageName}")
    @Produces(MediaType.IMAGE_WEBP)
    public byte[] getImage(@PathVariable String imageName) throws IOException {
        Optional<URL> imageUrl = resourceResolver.getResource("classpath:public/images/" + imageName);
        if (imageUrl.isPresent()) {
            URL url = imageUrl.get();
            Path imagePath = null;
            try {
                imagePath = Path.of(url.toURI());
            } catch (Exception e) {
                throw new IOException("Failed to convert URL to Path", e);
            }
            return Files.readAllBytes(imagePath);
        } else {
            throw new IOException("Image not found: " + imageName);
        }
    }
}
