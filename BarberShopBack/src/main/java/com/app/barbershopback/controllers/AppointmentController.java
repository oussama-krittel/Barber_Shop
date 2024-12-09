package com.app.barbershopback.controllers;

import com.app.barbershopback.dto.DateRequest;
import com.app.barbershopback.entities.Appointment;
import com.app.barbershopback.entities.Barber;
import com.app.barbershopback.security.user.User;
import com.app.barbershopback.services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // Endpoint 1: Get all barbers' busy periods for a specific date
    @GetMapping("/busy-periods")
    public Map<Barber, List<Integer>> getBusyPeriods(@RequestParam String dateTime) {
        LocalDateTime date = LocalDateTime.parse(dateTime);
        return appointmentService.getBarbersBusyPeriods(date);
    }

    // Endpoint 2: Reserve an appointment
    @PostMapping("/reserve")
    public Appointment reserveAppointment(
            @RequestParam Integer userId,
            @RequestParam Long barberId,
            @RequestBody DateRequest dateRequest) {
        return appointmentService.reserveAppointment(userId, barberId, dateRequest.getDateTime());
    }

    // Endpoint 3: Get appointments for a user sorted from newest to oldest
    @GetMapping("/user/{userId}")
    public List<Appointment> getUserAppointments(@PathVariable Long userId) {
        User user = new User();
        user.setId(userId);
        return appointmentService.getUserAppointments(user);
    }
}
