package com.codesentry.Backend.Repository;

import com.codesentry.Backend.Model.AptitudeQuestion;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AptitudeQuestionRepository extends MongoRepository<AptitudeQuestion, String> {
}
