package com.parents.registration.dao;

import com.parents.registration.database.DatabaseHelper;
import com.parents.registration.model.Parent;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ParentDAO {
    private final DatabaseHelper dbHelper;

    public ParentDAO() {
        this.dbHelper = DatabaseHelper.getInstance();
    }

    public void create(Parent parent) throws SQLException {
        String sql = "INSERT INTO parents (name, email, phone, address) VALUES (?, ?, ?, ?)";
        try (Connection conn = dbHelper.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            pstmt.setString(1, parent.getName());
            pstmt.setString(2, parent.getEmail());
            pstmt.setString(3, parent.getPhone());
            pstmt.setString(4, parent.getAddress());
            
            pstmt.executeUpdate();
            
            try (ResultSet rs = pstmt.getGeneratedKeys()) {
                if (rs.next()) {
                    parent.setId(rs.getLong(1));
                }
            }
        }
    }

    public Parent findById(Long id) throws SQLException {
        String sql = "SELECT * FROM parents WHERE id = ?";
        try (Connection conn = dbHelper.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setLong(1, id);
            ResultSet rs = pstmt.executeQuery();
            
            if (rs.next()) {
                Parent parent = new Parent();
                parent.setId(rs.getLong("id"));
                parent.setName(rs.getString("name"));
                parent.setEmail(rs.getString("email"));
                parent.setPhone(rs.getString("phone"));
                parent.setAddress(rs.getString("address"));
                parent.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
                return parent;
            }
        }
        return null;
    }

    public List<Parent> findAll() throws SQLException {
        List<Parent> parents = new ArrayList<>();
        String sql = "SELECT * FROM parents";
        
        try (Connection conn = dbHelper.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            
            while (rs.next()) {
                Parent parent = new Parent();
                parent.setId(rs.getLong("id"));
                parent.setName(rs.getString("name"));
                parent.setEmail(rs.getString("email"));
                parent.setPhone(rs.getString("phone"));
                parent.setAddress(rs.getString("address"));
                parent.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
                parents.add(parent);
            }
        }
        return parents;
    }

    public void update(Parent parent) throws SQLException {
        String sql = "UPDATE parents SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?";
        
        try (Connection conn = dbHelper.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, parent.getName());
            pstmt.setString(2, parent.getEmail());
            pstmt.setString(3, parent.getPhone());
            pstmt.setString(4, parent.getAddress());
            pstmt.setLong(5, parent.getId());
            
            pstmt.executeUpdate();
        }
    }

    public void delete(Long id) throws SQLException {
        String sql = "DELETE FROM parents WHERE id = ?";
        
        try (Connection conn = dbHelper.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setLong(1, id);
            pstmt.executeUpdate();
        }
    }
} 