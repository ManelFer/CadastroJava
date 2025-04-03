package com.parents.registration;

import com.parents.registration.dao.ParentDAO;
import com.parents.registration.model.Parent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Main implements CommandLineRunner {

    private final ParentDAO parentDAO;

    @Autowired
    public Main(ParentDAO parentDAO) {
        this.parentDAO = parentDAO;
    }

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        try {
            // Create a new parent
            Parent parent = new Parent();
            parent.setName("John");
            parent.setSurname("Doe");
            parent.setEmail("john.doe@example.com");
            parent.setAge(35);
            parent.setAddress("123 Main St");

            // Save the parent
            parentDAO.create(parent);
            System.out.println("Parent created with ID: " + parent.getId());

            // Find all parents
            System.out.println("\nAll parents in the database:");
            parentDAO.findAll().forEach(p -> System.out.println("ID: " + p.getId() + ", Name: " + p.getName()));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
} 