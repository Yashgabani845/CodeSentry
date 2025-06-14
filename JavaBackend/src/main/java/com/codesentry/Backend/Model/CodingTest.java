package com.codesentry.Backend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "coding_tests")
public class CodingTest {
    @Id
    private String id;
    private String title;
    private String description;
    private List<Example> examples;
    private List<TestCases> testCases;
    private List<String> constraints;
    private int marks;
    private String solution;
    private String createdBy;

    // Constructors
    public CodingTest() {}

    public CodingTest(String title, String description, List<Example> examples, List<TestCases> testCases, List<String> constraints, int marks, String solution, String createdBy) {
        this.title = title;
        this.description = description;
        this.examples = examples;
        this.testCases = testCases;
        this.constraints = constraints;
        this.marks = marks;
        this.solution = solution;
        this.createdBy = createdBy;
    }

    // Getters and Setters
    public String getId() { return id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<Example> getExamples() { return examples; }
    public void setExamples(List<Example> examples) { this.examples = examples; }

    public List<TestCases> getTestCases() { return testCases; }
    public void setTestCases(List<TestCases> testCases) { this.testCases = testCases; }

    public List<String> getConstraints() { return constraints; }
    public void setConstraints(List<String> constraints) { this.constraints = constraints; }

    public int getMarks() { return marks; }
    public void setMarks(int marks) { this.marks = marks; }

    public String getSolution() { return solution; }
    public void setSolution(String solution) { this.solution = solution; }

    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }
}

// Example and TestCase inner classes
class Example {
    private String input;
    private String output;

    public Example() {}

    public Example(String input, String output) {
        this.input = input;
        this.output = output;
    }

    public String getInput() { return input; }
    public void setInput(String input) { this.input = input; }

    public String getOutput() { return output; }
    public void setOutput(String output) { this.output = output; }
}

class TestCase {
    private String input;
    private String output;

    public TestCase() {}

    public TestCase(String input, String output) {
        this.input = input;
        this.output = output;
    }

    public String getInput() { return input; }
    public void setInput(String input) { this.input = input; }

    public String getOutput() { return output; }
    public void setOutput(String output) { this.output = output; }
}
