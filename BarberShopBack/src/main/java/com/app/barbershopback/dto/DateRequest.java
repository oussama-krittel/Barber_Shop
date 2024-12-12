package com.app.barbershopback.dto;

import java.time.LocalDateTime;

public class DateRequest {

    private LocalDateTime dateTime;

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }
}
