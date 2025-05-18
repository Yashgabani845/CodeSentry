package com.codesentry.Backend.Controller;
import com.codesentry.Backend.Model.Test;
import com.codesentry.Backend.Repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.List;

// @CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/tests")
public class TestController {
    @Autowired
    private TestRepository testRepository;
    
    // Create a new test
    @PostMapping("/create")
    public Test createTest(@RequestBody Test test) {
        if (test.getTestName() == null || test.getTestType() == null || test.getCreatedBy() == null) {
            throw new RuntimeException("Missing required fields");
        }
        return testRepository.save(test);
    }
    
    // Get all tests
    @GetMapping("/all")
    public List<Test> getAllTests() {
        return testRepository.findAll();
    }
    
    // Get test by ID
    @GetMapping("/{id}")
    public Test getTestById(@PathVariable String id) {
        return testRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Test not found"));
    }
    
    // Delete test
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTest(@PathVariable String id) {
        try {
            Test test = testRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Test not found"));
           
            testRepository.delete(test);
           
            return ResponseEntity.ok().body("Test deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete test: " + e.getMessage());
        }
    }
    
    // Update test questions
    @PutMapping("/{id}/update-questions")
    public ResponseEntity<?> updateTestQuestions(@PathVariable String id, @RequestBody Map<String, List<String>> payload) {
        try {
            Test test = testRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Test not found"));
           
            List<String> questionIds = payload.get("questionIds");
            if (questionIds == null) {
                return ResponseEntity.badRequest().body("Question IDs are required");
            }
           
            test.setQuestionIds(questionIds);
            testRepository.save(test);
           
            return ResponseEntity.ok().body(test);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update test questions: " + e.getMessage());
        }
    }
    
    // Add this new endpoint to update the entire test
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTest(@PathVariable String id, @RequestBody Test updatedTest) {
        try {
            Test test = testRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Test not found"));
            
            // Update test properties
            test.setTestName(updatedTest.getTestName());
            test.setTestType(updatedTest.getTestType());
            // test.setDescription(updatedTest.getDescription());
            test.setTotalMarks(updatedTest.getTotalMarks());
            // test.setPassingMarks(updatedTest.getPassingMarks());
            test.setStartTime(updatedTest.getStartTime());
            test.setEndTime(updatedTest.getEndTime());
            // Keep the existing questionIds unless explicitly updated
            if (updatedTest.getQuestionIds() != null) {
                test.setQuestionIds(updatedTest.getQuestionIds());
            }
            
            testRepository.save(test);
            
            return ResponseEntity.ok().body(test);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update test: " + e.getMessage());
        }
    }
}