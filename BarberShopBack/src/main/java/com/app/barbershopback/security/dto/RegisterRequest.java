package com.app.barbershopback.security.dto;

public record RegisterRequest(String firstname, String lastname, String email, String password) {
}
