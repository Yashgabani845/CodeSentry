package com.codesentry.Backend.Controller;
import com.codesentry.Backend.Piston.CodeRequest;
import com.codesentry.Backend.Piston.PistonService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/code")
public class CodeRunnerController {

    private final PistonService pistonService;

    public CodeRunnerController(PistonService pistonService) {
        this.pistonService = pistonService;
    }

//     @PostMapping("/run")
// public String runCode(@RequestParam String language, @RequestBody CodeRequest request) {
//     return pistonService.runCode(request.getCode(), language);
// }

}
