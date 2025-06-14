package com.codesentry.Backend.Piston;

import java.util.ArrayList;
import java.util.List;

public class PistonRequest {
    private String language;
    private String version;
    private List<FileDto> files;
    private String stdin;
    private List<String> args = new ArrayList<>();
    private int compile_timeout = 10000;
    private int run_timeout = 3000;

    public PistonRequest() {}

    public PistonRequest(String language, String version, List<FileDto> files, String stdin) {
        this.language = language;
        this.version = version;
        this.files = files;
        this.stdin = stdin;
    }

    public String getLanguage() { return language; }
    public String getVersion() { return version; }
    public List<FileDto> getFiles() { return files; }
    public String getStdin() { return stdin; }
    public List<String> getArgs() { return args; }
    public int getCompile_timeout() { return compile_timeout; }
    public int getRun_timeout() { return run_timeout; }

    public void setLanguage(String language) { this.language = language; }
    public void setVersion(String version) { this.version = version; }
    public void setFiles(List<FileDto> files) { this.files = files; }
    public void setStdin(String stdin) { this.stdin = stdin; }
    public void setArgs(List<String> args) { this.args = args; }
    public void setCompile_timeout(int compile_timeout) { this.compile_timeout = compile_timeout; }
    public void setRun_timeout(int run_timeout) { this.run_timeout = run_timeout; }
}
