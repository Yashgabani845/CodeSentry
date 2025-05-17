package com.codesentry.Backend.Controller;

import com.codesentry.Backend.Model.CodingTest;
import com.codesentry.Backend.Repository.CodingTestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/coding-tests")
public class CodingTestController {

    @Autowired
    private CodingTestRepository codingTestRepository;

    @GetMapping
    public List<CodingTest> getAllCodingTests() {
        return codingTestRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CodingTest> getCodingTestById(@PathVariable String id) {
        return codingTestRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public CodingTest createCodingTest(@RequestBody CodingTest codingTest) {
        return codingTestRepository.save(codingTest);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CodingTest> updateCodingTest(@PathVariable String id, @RequestBody CodingTest codingTestDetails) {
        return codingTestRepository.findById(id).map(codingTest -> {
            codingTest.setTitle(codingTestDetails.getTitle());
            codingTest.setDescription(codingTestDetails.getDescription());
            codingTest.setExamples(codingTestDetails.getExamples());
            codingTest.setTestCases(codingTestDetails.getTestCases());
            codingTest.setConstraints(codingTestDetails.getConstraints());
            codingTest.setMarks(codingTestDetails.getMarks());
            codingTest.setSolution(codingTestDetails.getSolution());
            codingTest.setCreatedBy(codingTestDetails.getCreatedBy());
            return ResponseEntity.ok(codingTestRepository.save(codingTest));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCodingTest(@PathVariable String id) {
        if (codingTestRepository.existsById(id)) {
            codingTestRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
