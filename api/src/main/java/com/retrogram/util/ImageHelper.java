package com.retrogram.util;

import io.micronaut.http.HttpHeaders;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.MediaType;
import io.micronaut.http.MutableHttpResponse;
import io.micronaut.http.server.types.files.StreamedFile;
import io.micronaut.objectstorage.googlecloud.GoogleCloudStorageEntry;
import com.google.cloud.storage.Blob;

public class ImageHelper {

    public static String buildKey(String imageId, String mediaType) {
        String extension = getExtensionFromMediaType(mediaType);
        return imageId + (extension.isEmpty() ? "" : "." + extension);
    }

    private static String getExtensionFromMediaType(String mediaType) {
        if (mediaType == null)
            return "";
        return switch (mediaType) {
            case "image/jpeg" -> "jpg";
            case "image/png" -> "png";
            case "image/gif" -> "gif";
            // Add more cases as needed
            default -> mediaType;
        };
    }

    public static HttpResponse<StreamedFile> buildStreamedFile(GoogleCloudStorageEntry entry) {
        Blob nativeEntry = entry.getNativeEntry();
        MediaType mediaType = MediaType.of(nativeEntry.getContentType());
        StreamedFile file = new StreamedFile(entry.getInputStream(), mediaType).attach(entry.getKey());
        MutableHttpResponse<Object> httpResponse = HttpResponse.ok()
                .header(HttpHeaders.ETAG, nativeEntry.getEtag());
        file.process(httpResponse);
        return httpResponse.body(file);
    }
}
