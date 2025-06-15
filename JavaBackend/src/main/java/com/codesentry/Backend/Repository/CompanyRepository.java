package com.codesentry.Backend.Repository;

import com.codesentry.Backend.Model.Company;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends MongoRepository<Company, String> {
    boolean existsByEmail(String email);
    boolean existsByAdminEmail(String adminEmail);
    Company findByAdminEmail(String adminEmail);
}