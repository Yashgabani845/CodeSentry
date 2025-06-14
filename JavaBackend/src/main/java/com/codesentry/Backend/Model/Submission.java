package com.codesentry.Backend.Model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "submissions")
public class Submission {

    @Id
    private String id;

    private String testId;
    private String questionId;
    private String userId;
    private String language;
    private String code;
    private List<TestResult> results;

    public Submission() {}

    public Submission(String testId, String questionId, String userId, String language, String code, List<TestResult> results) {
        this.testId = testId;
        this.questionId = questionId;
        this.userId = userId;
        this.language = language;
        this.code = code;
        this.results = results;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTestId() {
        return testId;
    }

    public void setTestId(String testId) {
        this.testId = testId;
    }

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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

    public List<TestResult> getResults() {
        return results;
    }

    public void setResults(List<TestResult> results) {
        this.results = results;
    }
}
