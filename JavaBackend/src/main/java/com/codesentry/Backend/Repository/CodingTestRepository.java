package com.codesentry.Backend.Repository;

import com.codesentry.Backend.Model.CodingTest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CodingTestRepository extends MongoRepository<CodingTest, String> {
}
