package com.image.compressor.service;

import net.coobird.thumbnailator.Thumbnails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
public class ImageCompressService {

    public byte[] compressSingle(MultipartFile file, double quality, String format) throws IOException {
        return compressImage(file.getBytes(), quality, format);
    }

    public byte[] compressBatch(List<MultipartFile> files, double quality, String format) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (ZipOutputStream zipOut = new ZipOutputStream(baos)) {
            for (MultipartFile file : files) {
                byte[] compressedBytes = compressImage(file.getBytes(), quality, format);
                String originalName = file.getOriginalFilename();
                String zipEntryName = originalName.replace("." + getFileExtension(originalName), 
                    "_q" + (int)(quality*100) + "_" + format.toLowerCase() + "." + format.toLowerCase());  // FIXED: Added .extension
                
                ZipEntry zipEntry = new ZipEntry(zipEntryName);
                zipOut.putNextEntry(zipEntry);
                zipOut.write(compressedBytes);
                zipOut.closeEntry();
            }
        }
        return baos.toByteArray();
    }

    private byte[] compressImage(byte[] imageBytes, double quality, String format) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        String outputFormat = validateFormat(format);
        
        Thumbnails.of(new ByteArrayInputStream(imageBytes))
                .scale(1.0)
                .outputQuality(Math.min(1.0, Math.max(0.1, quality)))
                .outputFormat(outputFormat)
                .toOutputStream(outputStream);
                
        return outputStream.toByteArray();
    }

    private String validateFormat(String format) {
        return switch (format.toLowerCase()) {
            case "png" -> "png";
            case "webp", "jpg", "jpeg" -> "jpg";
            default -> "jpg";
        };
    }

    private String getFileExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf(".") + 1);
    }
}
