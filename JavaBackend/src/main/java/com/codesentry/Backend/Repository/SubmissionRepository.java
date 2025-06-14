package com.codesentry.Backend.Repository;

import com.codesentry.Backend.Model.Submission;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SubmissionRepository extends MongoRepository<Submission, String> {
    // Add custom queries if needed
}
