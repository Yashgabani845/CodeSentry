package com.codesentry.Backend.Controller;


import com.codesentry.Backend.Model.Company;
import com.codesentry.Backend.Repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
@CrossOrigin(origins = "*") // Enable CORS for frontend
public class CompanyController {

    @Autowired
    private CompanyRepository companyRepository;

    @PostMapping("/register")
    public Company registerCompany(@RequestBody Company company) {
        return companyRepository.save(company);
    }

    @GetMapping
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @GetMapping("/admin/{email}")
    public Company getByAdminEmail(@PathVariable String email) {
        return companyRepository.findByAdminEmail(email);
    }

    @GetMapping("/exists/{email}")
    public boolean exists(@PathVariable String email) {
        return companyRepository.existsByAdminEmail(email);
    }
}
