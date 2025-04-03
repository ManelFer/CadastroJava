package com.parents.registration.model;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class Student {
    private Long id;
    private Long parentId;
    private String name;
    private LocalDate birthDate;
    private String grade;
    private LocalDateTime createdAt;
} 