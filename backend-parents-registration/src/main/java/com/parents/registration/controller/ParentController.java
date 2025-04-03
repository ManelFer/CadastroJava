package com.parents.registration.controller;

import com.parents.registration.dao.ParentDAO;
import com.parents.registration.model.Parent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/parents")
@CrossOrigin(origins = "*")
public class ParentController {

    private final ParentDAO parentDAO;

    @Autowired
    public ParentController(ParentDAO parentDAO) {
        this.parentDAO = parentDAO;
    }

    @PostMapping
    public ResponseEntity<?> createParent(@RequestBody Parent parent) {
        try {
            parentDAO.create(parent);
            return ResponseEntity.ok().build();
        } catch (SQLException e) {
            return ResponseEntity.badRequest().body("Error creating parent: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Parent>> getAllParents() {
        try {
            List<Parent> parents = parentDAO.findAll();
            return ResponseEntity.ok(parents);
        } catch (SQLException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Parent> getParentById(@PathVariable Long id) {
        try {
            Parent parent = parentDAO.findById(id);
            if (parent != null) {
                return ResponseEntity.ok(parent);
            }
            return ResponseEntity.notFound().build();
        } catch (SQLException e) {
            return ResponseEntity.badRequest().build();
        }
    }
} 