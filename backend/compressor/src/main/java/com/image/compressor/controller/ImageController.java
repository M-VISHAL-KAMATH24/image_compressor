package com.image.compressor.controller;

import com.image.compressor.service.ImageCompressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ImageController {

    @Autowired
    private ImageCompressService compressService;

    @PostMapping("/compress/batch")
    public ResponseEntity<byte[]> compressBatch(
            @RequestParam("files") List<MultipartFile> files,
            @RequestParam(value = "quality", defaultValue = "0.85") double quality,
            @RequestParam(value = "format", defaultValue = "jpg") String format) throws IOException {
        
        byte[] zipBytes = compressService.compressBatch(files, quality, format);
        
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=compressed-images.zip")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(zipBytes);
    }

    @PostMapping("/compress")
    public ResponseEntity<byte[]> compressSingle(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "quality", defaultValue = "0.85") double quality,
            @RequestParam(value = "format", defaultValue = "jpg") String format) throws IOException {
        
        byte[] compressedImage = compressService.compressSingle(file, quality, format);
        String originalName = file.getOriginalFilename();
        String extension = "." + format.toLowerCase();
        String compressedName = originalName.replace(getFileExtension(originalName), "compressed" + extension);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("attachment", compressedName);
        headers.setContentType(getMediaType(format));
        
        return ResponseEntity.ok().headers(headers).body(compressedImage);
    }

    private String getFileExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf(".") + 1);
    }

    private MediaType getMediaType(String format) {
        return switch (format.toLowerCase()) {
            case "webp" -> MediaType.parseMediaType("image/webp");
            case "png" -> MediaType.IMAGE_PNG;
            default -> MediaType.IMAGE_JPEG;
        };
    }
}
