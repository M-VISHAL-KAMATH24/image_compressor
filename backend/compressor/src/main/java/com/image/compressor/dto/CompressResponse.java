package com.image.compressor.dto;

public class CompressResponse {
    private String originalSize;
    private String compressedSize;
    private double savingsPercentage;

    // Constructors, getters, setters
    public CompressResponse() {}

    public CompressResponse(String originalSize, String compressedSize, double savingsPercentage) {
        this.originalSize = originalSize;
        this.compressedSize = compressedSize;
        this.savingsPercentage = savingsPercentage;
    }

    // Getters and setters
    public String getOriginalSize() { return originalSize; }
    public void setOriginalSize(String originalSize) { this.originalSize = originalSize; }
    
    public String getCompressedSize() { return compressedSize; }
    public void setCompressedSize(String compressedSize) { this.compressedSize = compressedSize; }
    
    public double getSavingsPercentage() { return savingsPercentage; }
    public void setSavingsPercentage(double savingsPercentage) { this.savingsPercentage = savingsPercentage; }
}
