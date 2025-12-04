package com.image.compressor.dto;

public class CompressionRequest {
    private double quality = 0.85;
    private String format = "jpg";

    public CompressionRequest() {}

    public CompressionRequest(double quality, String format) {
        this.quality = quality;
        this.format = format;
    }

    // Getters and setters
    public double getQuality() { return quality; }
    public void setQuality(double quality) { this.quality = quality; }
    
    public String getFormat() { return format; }
    public void setFormat(String format) { this.format = format; }
}
