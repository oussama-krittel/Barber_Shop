package com.app.barbershopback.entities;

import com.app.barbershopback.security.user.User;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "barber_id", referencedColumnName = "id", nullable = false)
    private Barber barber;

    private LocalDateTime startDate;

    // No-args constructor
    public Appointment() {}

    // All-args constructor
    public Appointment(Long id, User user, Barber barber, LocalDateTime startDate) {
        this.id = id;
        this.user = user;
        this.barber = barber;
        this.startDate = startDate;
    }

    // Getter for id
    public Long getId() {
        return id;
    }

    // Setter for id
    public void setId(Long id) {
        this.id = id;
    }

    // Getter for user
    public User getUser() {
        return user;
    }

    // Setter for user
    public void setUser(User user) {
        this.user = user;
    }

    // Getter for barber
    public Barber getBarber() {
        return barber;
    }

    // Setter for barber
    public void setBarber(Barber barber) {
        this.barber = barber;
    }

    // Getter for startDate
    public LocalDateTime getStartDate() {
        return startDate;
    }

    // Setter for startDate
    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }
}
