package com.codesentry.Backend.Piston;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
@Service
public class PistonService {
    public String runCode(String code, String language, String input) {
        String url = "https://emkc.org/api/v2/piston/execute";
    
        RestTemplate restTemplate = new RestTemplate();
    
        String normalizedLanguage;
        String version;
    
        switch(language.toLowerCase()) {
            case "python3":
            case "py":
            case "py3":
            case "python3.10":
            case "python3.10.0":
                normalizedLanguage = "python";
                version = "3.10.0";
                break;
            case "javascript":
            case "js":
                normalizedLanguage = "javascript";
                version = "18.12.1";
                break;
            case "java":
                normalizedLanguage = "java";
                version = "17.0.5";
                break;
            case "cpp":
            case "c++":
                normalizedLanguage = "cpp";
                version = "10.2.0"; 
                break;
            case "c":
                normalizedLanguage = "c";
                version = "10.2.0"; 
                break;
            default:
                throw new RuntimeException("Unsupported language or version: " + language);
        }
        
        String extension = switch (normalizedLanguage) {
            case "python" -> "py";
            case "java" -> "java";
            case "javascript" -> "js";
            case "c" -> "c";
            case "cpp" -> "cpp";
            default -> "txt";
        };
    
        FileDto file = new FileDto("main." + extension, code);
    
        PistonRequest request = new PistonRequest(normalizedLanguage, version, Collections.singletonList(file), input);
        System.out.println("Piston Input: " + code);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
    
        HttpEntity<PistonRequest> entity = new HttpEntity<>(request, headers);
    
        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                entity,
                String.class
        );
        System.out.println("== Raw Response from Piston ==");
System.out.println(response.getBody());

        return response.getBody();
    }
    

}
