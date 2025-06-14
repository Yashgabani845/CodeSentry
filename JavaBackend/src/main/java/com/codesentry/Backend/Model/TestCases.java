package com.codesentry.Backend.Model;

public class TestCases {
    private String input;
    private String output;

    // Constructors
    public TestCases() {}

    public TestCases(String input, String output) {
        this.input = input;
        this.output = output;
    }

    // Getters and Setters
    public String getInput() {
        return input;
    }

    public void setInput(String input) {
        this.input = input;
    }

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }
}
