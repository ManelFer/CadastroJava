package com.parents.registration.controller;

import com.parents.registration.dao.ParentDAO;
import com.parents.registration.model.Parent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/parents")
@CrossOrigin(origins = "*")
public class ParentController {

    private final ParentDAO parentDAO;

    @Autowired
    public ParentController(ParentDAO parentDAO) {
        this.parentDAO = parentDAO;
    }

    @GetMapping("/test")
    public ResponseEntity<?> testConnection() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Backend is working!");
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<?> createParent(@RequestBody Parent parent) {
        try {
            // Validate required fields
            if (parent.getName() == null || parent.getName().trim().isEmpty() ||
                parent.getSurname() == null || parent.getSurname().trim().isEmpty() ||
                parent.getEmail() == null || parent.getEmail().trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Nome, sobrenome e email são campos obrigatórios");
                return ResponseEntity.badRequest().body(error);
            }

            parentDAO.create(parent);
            Map<String, Object> response = new HashMap<>();
            response.put("id", parent.getId());
            response.put("message", "Parent created successfully");
            return ResponseEntity.ok(response);
        } catch (SQLException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error creating parent: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllParents() {
        try {
            List<Parent> parents = parentDAO.findAll();
            return ResponseEntity.ok(parents);
        } catch (SQLException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error retrieving parents: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getParentById(@PathVariable Long id) {
        try {
            Parent parent = parentDAO.findById(id);
            if (parent != null) {
                return ResponseEntity.ok(parent);
            }
            Map<String, String> error = new HashMap<>();
            error.put("message", "Parent not found with id: " + id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        } catch (SQLException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error retrieving parent: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
} 