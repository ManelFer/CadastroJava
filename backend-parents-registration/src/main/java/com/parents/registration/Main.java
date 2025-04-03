package com.parents.registration;

import com.parents.registration.dao.ParentDAO;
import com.parents.registration.model.Parent;

import java.sql.SQLException;

public class Main {
    public static void main(String[] args) {
        try {
            // Create a new parent
            Parent parent = new Parent();
            parent.setName("John Doe");
            parent.setEmail("john.doe@example.com");
            parent.setPhone("1234567890");
            parent.setAddress("123 Main St");

            // Save the parent
            ParentDAO parentDAO = new ParentDAO();
            parentDAO.create(parent);
            System.out.println("Parent created with ID: " + parent.getId());

            // Find all parents
            System.out.println("\nAll parents in the database:");
            parentDAO.findAll().forEach(p -> System.out.println("ID: " + p.getId() + ", Name: " + p.getName()));

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
} 