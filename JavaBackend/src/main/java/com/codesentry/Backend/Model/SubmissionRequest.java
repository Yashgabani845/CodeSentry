package com.codesentry.Backend.Model;

public class SubmissionRequest {
    private String testId;
    private String language;
    private String code;
    private int questionNumber;
    private String userId; // ✅ New field

    public String getTestId() {
        return testId;
    }

    public void setTestId(String testId) {
        this.testId = testId;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getQuestionNumber() {
        return questionNumber;
    }

    public void setQuestionNumber(int questionNumber) {
        this.questionNumber = questionNumber;
    }

    public String getUserId() {  // ✅ Getter for userId
        return userId;
    }

    public void setUserId(String userId) {  // ✅ Setter for userId
        this.userId = userId;
    }
}
