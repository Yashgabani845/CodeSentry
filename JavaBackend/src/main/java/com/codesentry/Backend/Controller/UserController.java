package com.codesentry.Backend.Controller;

import com.codesentry.Backend.Model.User;
import com.codesentry.Backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// @CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add")
    public User createUser(@RequestBody User user) {
        if (user.getFirstName() == null || user.getLastName() == null ||
                user.getEmail() == null || user.getPassword() == null || user.getRole() == null) {
            throw new RuntimeException("Missing required fields");
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("User with this email already exists");
        }

        return userRepository.save(user);
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping("/by-email")
    public User getUserByEmail(@RequestParam String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody User loginData) {
        Optional<User> userOpt = userRepository.findByEmail(loginData.getEmail());

        if (userOpt.isPresent() && userOpt.get().getPassword().equals(loginData.getPassword())) {
            return userOpt.get();
        } else {
            throw new RuntimeException("Invalid email or password");
        }
    }
}
