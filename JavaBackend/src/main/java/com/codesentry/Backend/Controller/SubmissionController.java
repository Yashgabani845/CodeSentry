package com.codesentry.Backend.Controller;
import com.codesentry.Backend.Model.CodingTest;
import com.codesentry.Backend.Model.Test;
import com.codesentry.Backend.Model.TestCases;
import com.codesentry.Backend.Model.TestResult;
import com.codesentry.Backend.Model.SubmissionRequest;

import com.codesentry.Backend.Piston.PistonService;

import com.codesentry.Backend.Repository.TestRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.codesentry.Backend.Repository.CodingTestRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    private final TestRepository testRepository;
    private final CodingTestRepository codingTestRepository;
    private final PistonService pistonService;

    public SubmissionController(TestRepository testRepository,
                                CodingTestRepository codingTestRepository,
                                PistonService pistonService) {
        this.testRepository = testRepository;
        this.codingTestRepository = codingTestRepository;
        this.pistonService = pistonService;
    }
@PostMapping
public ResponseEntity<?> submitCode(@RequestBody SubmissionRequest request) {
    try {
        System.out.println("Received Submission: " + request);

        Test test = testRepository.findById(request.getTestId())
                .orElseThrow(() -> new RuntimeException("Test not found: " + request.getTestId()));

        String codingTestId = test.getQuestionIds().get(request.getQuestionNumber());
        System.out.println("Fetched Coding Test ID: " + codingTestId);

        CodingTest codingTest = codingTestRepository.findById(codingTestId)
                .orElseThrow(() -> new RuntimeException("Coding test not found: " + codingTestId));

        List<TestResult> results = new ArrayList<>();
        ObjectMapper mapper = new ObjectMapper(); // Jackson JSON parser

        for (TestCases testCase : codingTest.getTestCases()) {
            String pistonRawResponse = pistonService.runCode(request.getCode(), request.getLanguage(), testCase.getInput());

            // Extract actual stdout from JSON
            String actualOutput;
            try {
                JsonNode root = mapper.readTree(pistonRawResponse);
                actualOutput = root.path("run").path("stdout").asText().trim();
            } catch (Exception e) {
                actualOutput = "Error parsing output";
            }

            boolean passed = actualOutput.equals(testCase.getOutput().trim());

            results.add(new TestResult(
                testCase.getInput(),
                testCase.getOutput(),
                actualOutput,
                passed
            ));
        }

        return ResponseEntity.ok(results);

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
    }
}


}
