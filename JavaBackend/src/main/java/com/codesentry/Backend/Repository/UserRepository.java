package com.codesentry.Backend.Repository;
import com.codesentry.Backend.Model.*;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {}