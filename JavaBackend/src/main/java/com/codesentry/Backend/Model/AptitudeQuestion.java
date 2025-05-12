package com.codesentry.Backend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "aptitude_questions")
public class AptitudeQuestion {
    @Id
    private String id;
    private String questionText;
    private List<String> options;
    private String correctAnswer;
    private int marks;

    // Constructors
    public AptitudeQuestion() {}

    public AptitudeQuestion(String questionText, List<String> options, String correctAnswer, int marks) {
        this.questionText = questionText;
        this.options = options;
        this.correctAnswer = correctAnswer;
        this.marks = marks;
    }

    // Getters and Setters
    public String getId() { return id; }

    public String getQuestionText() { return questionText; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }

    public List<String> getOptions() { return options; }
    public void setOptions(List<String> options) { this.options = options; }

    public String getCorrectAnswer() { return correctAnswer; }
    public void setCorrectAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; }

    public int getMarks() { return marks; }
    public void setMarks(int marks) { this.marks = marks; }
}
