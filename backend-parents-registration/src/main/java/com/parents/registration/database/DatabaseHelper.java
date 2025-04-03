package com.parents.registration.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class DatabaseHelper {
    private static final String DB_URL = "jdbc:sqlite:parents_registration.db";
    private static DatabaseHelper instance;
    private Connection connection;

    private DatabaseHelper() {
        try {
            connection = DriverManager.getConnection(DB_URL);
            onCreate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static synchronized DatabaseHelper getInstance() {
        if (instance == null) {
            instance = new DatabaseHelper();
        }
        return instance;
    }

    public Connection getConnection() {
        return connection;
    }

    private void onCreate() {
        try (Statement statement = connection.createStatement()) {
            // Create Parents table
            statement.execute("CREATE TABLE IF NOT EXISTS parents (" +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                    "name TEXT NOT NULL," +
                    "email TEXT UNIQUE NOT NULL," +
                    "phone TEXT," +
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