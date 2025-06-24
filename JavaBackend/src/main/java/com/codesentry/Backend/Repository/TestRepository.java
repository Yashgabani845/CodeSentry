package com.codesentry.Backend.Repository;

import com.codesentry.Backend.Model.Test;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface TestRepository extends MongoRepository<Test, String> {
    List<Test> findByCreatedBy(String createdBy);
}
