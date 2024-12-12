package com.app.barbershopback.dto;

public class ReserveAppointmentRequest {
    private Integer userId;
    private Long barberId;
    private String dateTime;

    // Getters and setters
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Long getBarberId() {
        return barberId;
    }

    public void setBarberId(Long barberId) {
        this.barberId = barberId;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }
}

