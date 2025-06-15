package com.codesentry.Backend.Model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "companies")
public class Company {

    @Id
    private String id;

    private String name;
    private String email;
    private String website;
    private String industry;
    private String size;
    private String establishedYear;

    private String description;
    private String linkedin;
    private String logoUrl;

    private AdminUser admin;

    // --- Constructors ---
    public Company() {}

    public Company(String name, String email, String website, String industry, String size,
                   String establishedYear, String description, String linkedin,
                   String logoUrl, AdminUser admin) {
        this.name = name;
        this.email = email;
        this.website = website;
        this.industry = industry;
        this.size = size;
        this.establishedYear = establishedYear;
        this.description = description;
        this.linkedin = linkedin;
        this.logoUrl = logoUrl;
        this.admin = admin;
    }

    // --- Getters and Setters ---

    public String getId() { return id; }

    public void setId(String id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getWebsite() { return website; }

    public void setWebsite(String website) { this.website = website; }

    public String getIndustry() { return industry; }

    public void setIndustry(String industry) { this.industry = industry; }

    public String getSize() { return size; }

    public void setSize(String size) { this.size = size; }

    public String getEstablishedYear() { return establishedYear; }

    public void setEstablishedYear(String establishedYear) { this.establishedYear = establishedYear; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public String getLinkedin() { return linkedin; }

    public void setLinkedin(String linkedin) { this.linkedin = linkedin; }

    public String getLogoUrl() { return logoUrl; }

    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }

    public AdminUser getAdmin() { return admin; }

    public void setAdmin(AdminUser admin) { this.admin = admin; }

    // --- Inner class for admin user ---
    public static class AdminUser {
        private String fullName;
        private String designation;
        private String email;
        private String password; // Should be hashed

        public AdminUser() {}

        public AdminUser(String fullName, String designation, String email, String password) {
            this.fullName = fullName;
            this.designation = designation;
            this.email = email;
            this.password = password;
        }

        public String getFullName() { return fullName; }

        public void setFullName(String fullName) { this.fullName = fullName; }

        public String getDesignation() { return designation; }

        public void setDesignation(String designation) { this.designation = designation; }

        public String getEmail() { return email; }

        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }

        public void setPassword(String password) { this.password = password; }
    }
}
