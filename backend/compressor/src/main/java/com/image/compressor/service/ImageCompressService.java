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

    public byte[] compressSingle(MultipartFile file) throws IOException {
        return compressImage(file.getBytes());  // Fixed: call correct method
    }

    public byte[] compressBatch(List<MultipartFile> files) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (ZipOutputStream zipOut = new ZipOutputStream(baos)) {
            
            for (MultipartFile file : files) {
                byte[] compressedBytes = compressImage(file.getBytes());  // Fixed: correct method
                String originalName = file.getOriginalFilename();
                String zipEntryName = originalName.replace("." + getFileExtension(originalName), "_compressed.jpg");
                
                ZipEntry zipEntry = new ZipEntry(zipEntryName);
                zipOut.putNextEntry(zipEntry);
                zipOut.write(compressedBytes);
                zipOut.closeEntry();
            }
        }
        
        return baos.toByteArray();
    }

    private byte[] compressImage(byte[] imageBytes) throws IOException {
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    Thumbnails.of(new ByteArrayInputStream(imageBytes))  // Fixed: use InputStream
            .scale(1.0)
            .outputQuality(0.85)
            .outputFormat("jpg")
            .toOutputStream(outputStream);
    return outputStream.toByteArray();
}


    private String getFileExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf(".") + 1);
    }
}
