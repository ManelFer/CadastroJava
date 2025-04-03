package com.parents.registration.model;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class Parent {
    private Long id;
    private String name;
    private String surname;
    private String email;
    private Integer age;
    private String address;
    private LocalDateTime createdAt;
} 