package com.codesentry.Backend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.time.LocalDateTime;

@Document(collection = "tests")
public class Test {
    @Id
    private String id;
    private String testName;
    private String testType;  // "aptitude" or "coding"
    private String createdBy;
    private LocalDateTime createdAt;
    private List<String> questionIds;  // List of question IDs

    // Constructors
    public Test() {
        this.createdAt = LocalDateTime.now();
    }

    public Test(String testName, String testType, String createdBy, List<String> questionIds) {
        this.testName = testName;
        this.testType = testType;
        this.createdBy = createdBy;
        this.questionIds = questionIds;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() { return id; }

    public String getTestName() { return testName; }
    public void setTestName(String testName) { this.testName = testName; }

    public String getTestType() { return testType; }
    public void setTestType(String testType) { this.testType = testType; }

    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public List<String> getQuestionIds() { return questionIds; }
    public void setQuestionIds(List<String> questionIds) { this.questionIds = questionIds; }
}
