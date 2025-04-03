package com.parents.registration.database;

import org.springframework.stereotype.Component;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

@Component
public class DatabaseHelper {
    private static final String DB_URL = "jdbc:sqlite:parents_registration.db";
    private Connection connection;

    public DatabaseHelper() {
        initializeConnection();
    }

    private void initializeConnection() {
        try {
            if (connection == null || connection.isClosed()) {
                connection = DriverManager.getConnection(DB_URL);
                onCreate();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public Connection getConnection() {
        try {
            if (connection == null || connection.isClosed()) {
                initializeConnection();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return connection;
    }

    private void onCreate() {
        Statement statement = null;
        try {
            statement = connection.createStatement();
            
            // Drop existing tables if they exist
            statement.execute("DROP TABLE IF EXISTS parents");
            statement.execute("DROP TABLE IF EXISTS students");

            // Create Parents table
            statement.execute("CREATE TABLE IF NOT EXISTS parents (" +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                    "name TEXT NOT NULL," +
                    "surname TEXT NOT NULL," +
                    "email TEXT UNIQUE NOT NULL," +
                    "age INTEGER," +
                    "address TEXT," +
                    "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
                    ")");

            // Create Students table
            statement.execute("CREATE TABLE IF NOT EXISTS students (" +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                    "parent_id INTEGER," +
                    "name TEXT NOT NULL," +
                    "birth_date DATE," +
                    "grade TEXT," +
                    "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
                    "FOREIGN KEY (parent_id) REFERENCES parents(id)" +
                    ")");

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (statement != null) {
                try {
                    statement.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public void closeConnection() {
        try {
            if (connection != null && !connection.isClosed()) {
                connection.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
} 