package com.codesentry.Backend.Piston;

// PistonRequest.java
import java.util.List;

public class PistonRequest {
    private String language;
    private String version;
    private List<FileDto> files;

    public PistonRequest() {}

    public PistonRequest(String language, String version, List<FileDto> files) {
        this.language = language;
        this.version = version;
        this.files = files;
    }

    public String getLanguage() { return language; }
    public String getVersion() { return version; }
    public List<FileDto> getFiles() { return files; }

}
