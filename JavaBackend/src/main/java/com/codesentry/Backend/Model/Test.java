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
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private List<String> questionIds;  // List of question IDs (Aptitude) or coding test IDs (Coding)
    private int totalMarks;
    private boolean isActive;

    // Constructors
    public Test() {
        this.createdAt = LocalDateTime.now();
        this.isActive = true;
    }

    public Test(String testName, String testType, String createdBy, List<String> questionIds, List<String> codingTestIds, LocalDateTime startTime, LocalDateTime endTime, int totalMarks) {
        this.testName = testName;
        this.testType = testType;
        this.createdBy = createdBy;
        this.questionIds = questionIds;
        // this.codingTestIds = codingTestIds;
        this.createdAt = LocalDateTime.now();
        this.startTime = startTime;
        this.endTime = endTime;
        this.totalMarks = totalMarks;
        this.isActive = true;
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

    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }

    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }

    public List<String> getQuestionIds() { return questionIds; }
    public void setQuestionIds(List<String> questionIds) { this.questionIds = questionIds; }

    
    public int getTotalMarks() { return totalMarks; }
    public void setTotalMarks(int totalMarks) { this.totalMarks = totalMarks; }

    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }
}
