package com.parentsapp;

import com.google.gson.Gson;
import com.parentsapp.models.Parent;
import spark.Spark;

import static spark.Spark.*;

public class Main {
    public static void main(String[] args) {
        // Configuração inicial
        port(8080);
        Spark.staticFiles.location("/public");
        
        // Inicializa o banco de dados
        Database.initialize();
        
        // Configura CORS
        enableCORS();
        
        // Rota para cadastro
        post("/parents", (req, res) -> {
            res.type("application/json");
            
            try {
                Parent parent = new Gson().fromJson(req.body(), Parent.class);
                Database.createParent(parent);
                
                res.status(201);
                return new Gson().toJson(new SimpleResponse("Parent created successfully"));
            } catch (Exception e) {
                res.status(400);
                return new Gson().toJson(new SimpleResponse("Error: " + e.getMessage()));
            }
        });
        
        // Rota de teste
        get("/", (req, res) -> "API de Cadastro de Pais");
    }
    
    private static void enableCORS() {
        options("/*", (request, response) -> {
            response.header("Access-Control-Allow-Headers", "*");
            response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
            return "OK";
        });

        before((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Request-Method", "*");
            response.header("Access-Control-Allow-Headers", "*");
        });
    }
    
    static class SimpleResponse {
        String message;
        
        SimpleResponse(String message) {
            this.message = message;
        }
    }
}