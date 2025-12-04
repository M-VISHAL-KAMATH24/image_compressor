package com.image.compressor.util;

public class ImageFormatValidator {
    
    private static final String[] SUPPORTED_FORMATS = {"jpg", "jpeg", "png", "webp"};
    
    public static boolean isValidFormat(String format) {
        if (format == null) return false;
        for (String supported : SUPPORTED_FORMATS) {
            if (supported.equalsIgnoreCase(format)) {
                return true;
            }
        }
        return false;
    }
    
    public static String normalizeFormat(String format) {
        return switch (format.toLowerCase()) {
            case "jpeg" -> "jpg";
            case "jpg", "png", "webp" -> format.toLowerCase();
            default -> "jpg";
        };
    }
}
