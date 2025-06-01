package com.codesentry.Backend.Piston;

public class FileDto {
    private String name;
    private String content;

    public FileDto() {}

    public FileDto(String name, String content) {
        this.name = name;
        this.content = content;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}
