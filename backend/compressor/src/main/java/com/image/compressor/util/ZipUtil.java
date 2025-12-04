package com.image.compressor.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import java.util.*;

public class ZipUtil {
    
    public static byte[] createZip(List<byte[]> files, List<String> fileNames) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (ZipOutputStream zipOut = new ZipOutputStream(baos)) {
            for (int i = 0; i < files.size(); i++) {
                ZipEntry zipEntry = new ZipEntry(fileNames.get(i));
                zipOut.putNextEntry(zipEntry);
                zipOut.write(files.get(i));
                zipOut.closeEntry();
            }
        }
        return baos.toByteArray();
    }
}
