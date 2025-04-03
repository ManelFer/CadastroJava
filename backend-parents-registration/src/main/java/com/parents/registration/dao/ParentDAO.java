package com.parents.registration.dao;

import com.parents.registration.database.DatabaseHelper;
import com.parents.registration.model.Parent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class ParentDAO {
    private final DatabaseHelper dbHelper;

    @Autowired
    public ParentDAO(DatabaseHelper dbHelper) {
        this.dbHelper = dbHelper;
    }

    public void create(Parent parent) throws SQLException {
        String sql = "INSERT INTO parents (name, surname, email, age, address) VALUES (?, ?, ?, ?, ?)";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            conn = dbHelper.getConnection();
            pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            
            pstmt.setString(1, parent.getName());
            pstmt.setString(2, parent.getSurname());
            pstmt.setString(3, parent.getEmail());
            pstmt.setObject(4, parent.getAge());
            pstmt.setString(5, parent.getAddress());
            
            pstmt.executeUpdate();
            
            rs = pstmt.getGeneratedKeys();
            if (rs.next()) {
                parent.setId(rs.getLong(1));
            }
        } finally {
            if (rs != null) rs.close();
            if (pstmt != null) pstmt.close();
            // Don't close the connection here, let DatabaseHelper manage it
        }
    }

    public Parent findById(Long id) throws SQLException {
        String sql = "SELECT * FROM parents WHERE id = ?";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            conn = dbHelper.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setLong(1, id);
            rs = pstmt.executeQuery();
            
            if (rs.next()) {
                Parent parent = new Parent();
                parent.setId(rs.getLong("id"));
                parent.setName(rs.getString("name"));
                parent.setSurname(rs.getString("surname"));
                parent.setEmail(rs.getString("email"));
                parent.setAge(rs.getInt("age"));
                parent.setAddress(rs.getString("address"));
                parent.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
                return parent;
            }
            return null;
        } finally {
            if (rs != null) rs.close();
            if (pstmt != null) pstmt.close();
        }
    }

    public List<Parent> findAll() throws SQLException {
        List<Parent> parents = new ArrayList<>();
        String sql = "SELECT * FROM parents";
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        try {
            conn = dbHelper.getConnection();
            stmt = conn.createStatement();
            rs = stmt.executeQuery(sql);
            
            while (rs.next()) {
                Parent parent = new Parent();
                parent.setId(rs.getLong("id"));
                parent.setName(rs.getString("name"));
                parent.setSurname(rs.getString("surname"));
                parent.setEmail(rs.getString("email"));
                parent.setAge(rs.getInt("age"));
                parent.setAddress(rs.getString("address"));
                parent.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
                parents.add(parent);
            }
            return parents;
        } finally {
            if (rs != null) rs.close();
            if (stmt != null) stmt.close();
        }
    }

    public void update(Parent parent) throws SQLException {
        String sql = "UPDATE parents SET name = ?, surname = ?, email = ?, age = ?, address = ? WHERE id = ?";
        Connection conn = null;
        PreparedStatement pstmt = null;

        try {
            conn = dbHelper.getConnection();
            pstmt = conn.prepareStatement(sql);
            
            pstmt.setString(1, parent.getName());
            pstmt.setString(2, parent.getSurname());
            pstmt.setString(3, parent.getEmail());
            pstmt.setObject(4, parent.getAge());
            pstmt.setString(5, parent.getAddress());
            pstmt.setLong(6, parent.getId());
            
            pstmt.executeUpdate();
        } finally {
            if (pstmt != null) pstmt.close();
        }
    }

    public void delete(Long id) throws SQLException {
        String sql = "DELETE FROM parents WHERE id = ?";
        Connection conn = null;
        PreparedStatement pstmt = null;

        try {
            conn = dbHelper.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setLong(1, id);
            pstmt.executeUpdate();
        } finally {
            if (pstmt != null) pstmt.close();
        }
    }
} 