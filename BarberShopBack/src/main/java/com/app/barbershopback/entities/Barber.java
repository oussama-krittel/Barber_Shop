package com.app.barbershopback.entities;

import jakarta.persistence.*;

@Entity
public class Barber {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // No-args constructor
    public Barber() {}

    // All-args constructor
    public Barber(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    // Getter for id
    public Long getId() {
        return id;
    }

    // Setter for id
    public void setId(Long id) {
        this.id = id;
    }

    // Getter for name
    public String getName() {
        return name;
    }

    // Setter for name
    public void setName(String name) {
        this.name = name;
    }
}
