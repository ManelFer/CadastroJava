package com.parentsapp;

import java.sql.*;

import com.parentsapp.models.Parent;

public class Database {
    private static final String DB_URL = "jdbc:sqlite:parents.db";

    public static void initialize() {
        try (Connection conn = DriverManager.getConnection(DB_URL);
             Statement stmt = conn.createStatement()) {
            
            String sql = "CREATE TABLE IF NOT EXISTS parents (" +
                         "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                         "firstName TEXT NOT NULL," +
                         "lastName TEXT NOT NULL," +
                         "age INTEGER," +
                         "email TEXT NOT NULL," +
                         "address TEXT)";
            
            stmt.execute(sql);
            System.out.println("Database initialized successfully");
        } catch (SQLException e) {
            System.err.println("Error initializing database: " + e.getMessage());
        }
    }

    public static void createParent(Parent parent) {
        String sql = "INSERT INTO parents(firstName, lastName, age, email, address) VALUES(?,?,?,?,?)";
        
        try (Connection conn = DriverManager.getConnection(DB_URL);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, parent.getFirstName());
            pstmt.setString(2, parent.getLastName());
            pstmt.setObject(3, parent.getAge(), Types.INTEGER);
            pstmt.setString(4, parent.getEmail());
            pstmt.setString(5, parent.getAddress());
            
            pstmt.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error creating parent: " + e.getMessage());
            throw new RuntimeException("Database error");
        }
    }
}