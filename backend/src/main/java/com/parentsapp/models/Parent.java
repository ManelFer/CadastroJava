package com.parentsapp.models;

public class Parent {
    private String firstName;
    private String lastName;
    private Integer age;
    private String email;
    private String address;

    // Construtor, getters e setters
    public Parent() {}

    // Getters e Setters (gerar para todos os campos)
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    

    //lastName
    public String getLastName(){
        return lastName;
    }
    public void setLastName(String lastName){
        this.lastName = lastName;
    }

    // age
    public Integer getAge(){
        return age;
    }
    public void setAge(Integer age){
        this.age = age;
    }

    // email
    public String getEmail(){
        return email;
    }
    public void setEmail(String email){
        this.email = email;
    }

    // address
    public String getAddress(){
        return address;
    }
    public void setAddress(String address){
        this.address = address;
    }
    // ... outros getters e setters
}