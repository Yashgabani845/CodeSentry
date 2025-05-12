package com.codesentry.Backend.Controller;

import com.codesentry.Backend.Model.AptitudeQuestion;
import com.codesentry.Backend.Repository.AptitudeQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/aptitude-questions")
public class AptitudeQuestionController {

    @Autowired
    private AptitudeQuestionRepository aptitudeQuestionRepository;

    // Create a new aptitude question
    @PostMapping("/add")
    public AptitudeQuestion addQuestion(@RequestBody AptitudeQuestion question) {
        if (question.getQuestionText() == null || question.getOptions() == null || 
            question.getCorrectAnswer() == null || question.getMarks() <= 0) {
            throw new RuntimeException("Missing required fields or invalid marks");
        }
        return aptitudeQuestionRepository.save(question);
    }

    // Get all aptitude questions
    @GetMapping("/all")
    public List<AptitudeQuestion> getAllQuestions() {
        return aptitudeQuestionRepository.findAll();
    }

    // Get question by ID
    @GetMapping("/{id}")
    public AptitudeQuestion getQuestionById(@PathVariable String id) {
        return aptitudeQuestionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
    }

    
}
