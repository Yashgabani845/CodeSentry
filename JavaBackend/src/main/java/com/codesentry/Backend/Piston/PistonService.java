package com.codesentry.Backend.Piston;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
@Service
public class PistonService {
public String runCode(String code, String language) {
    String url = "https://emkc.org/api/v2/piston/execute";

    RestTemplate restTemplate = new RestTemplate();

    // Map aliases to runtime names and versions
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
            version = "18.12.1"; // example version
            break;
        case "java":
            normalizedLanguage = "java";
            version = "17.0.5"; // example version
            break;
        // add more mappings as needed
        default:
            normalizedLanguage = language.toLowerCase();
            version = "default";
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
    PistonRequest request = new PistonRequest(normalizedLanguage, version, Collections.singletonList(file));

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    HttpEntity<PistonRequest> entity = new HttpEntity<>(request, headers);

    ResponseEntity<String> response = restTemplate.exchange(
            url,
            HttpMethod.POST,
            entity,
            String.class
    );

    return response.getBody();
}


}
