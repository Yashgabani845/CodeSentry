package com.codesentry.Backend.Controller;

import com.codesentry.Backend.Model.AptitudeQuestion;
import com.codesentry.Backend.Repository.AptitudeQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/aptitude-questions")
public class AptitudeQuestionController {

    @Autowired
    private AptitudeQuestionRepository aptitudeQuestionRepository;

    @PostMapping("/add")
    public AptitudeQuestion addQuestion(@RequestBody AptitudeQuestion question) {
        if (question.getQuestionText() == null || question.getOptions() == null || 
            question.getCorrectAnswer() == null || question.getMarks() <= 0) {
            throw new RuntimeException("Missing required fields or invalid marks");
        }
        return aptitudeQuestionRepository.save(question);
    }

    @GetMapping("/all")
    public List<AptitudeQuestion> getAllQuestions() {
        return aptitudeQuestionRepository.findAll();
    }

    @GetMapping("/{id}")
    public AptitudeQuestion getQuestionById(@PathVariable String id) {
        return aptitudeQuestionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
    }

    @PutMapping("/{id}")
    public AptitudeQuestion updateQuestion(@PathVariable String id, @RequestBody AptitudeQuestion questionDetails) {
        return aptitudeQuestionRepository.findById(id)
            .map(question -> {
                question.setQuestionText(questionDetails.getQuestionText());
                question.setOptions(questionDetails.getOptions());
                question.setCorrectAnswer(questionDetails.getCorrectAnswer());
                question.setMarks(questionDetails.getMarks());
                return aptitudeQuestionRepository.save(question);
            })
            .orElseThrow(() -> new RuntimeException("Question not found"));
    }
}
