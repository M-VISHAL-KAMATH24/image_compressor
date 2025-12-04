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
            @RequestParam(value = "quality", defaultValue = "0.85") double quality) throws IOException {
        
        byte[] zipBytes = compressService.compressBatch(files, quality);
        
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=compressed-images.zip")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(zipBytes);
    }

    @PostMapping("/compress")
    public ResponseEntity<byte[]> compressSingle(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "quality", defaultValue = "0.85") double quality) throws IOException {
        
        byte[] compressedImage = compressService.compressSingle(file, quality);
        String originalName = file.getOriginalFilename();
        String extension = originalName.substring(originalName.lastIndexOf("."));
        String compressedName = originalName.replace(extension, "_compressed.jpg");
        
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + compressedName + "\"")
                .contentType(MediaType.IMAGE_JPEG)
                .body(compressedImage);
    }
}
