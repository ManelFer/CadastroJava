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
            // Criar novo objeto Parent
            Parent parent = new Parent();
            parent.setName("John");
            parent.setSurname("Doe");
            parent.setEmail("john.doe@example.com");
            parent.setAge(35);
            parent.setAddress("123 Main St");

            // Salvar o objeto Parent no banco de dados
            parentDAO.create(parent);
            System.out.println("Parent created with ID: " + parent.getId());

            // Buscar o objeto Parent pelo ID
            System.out.println("\nAll parents in the database:");
            parentDAO.findAll().forEach(p -> System.out.println("ID: " + p.getId() + ", Name: " + p.getName()));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
} 