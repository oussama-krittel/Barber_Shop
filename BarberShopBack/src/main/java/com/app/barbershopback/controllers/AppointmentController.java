package com.app.barbershopback.controllers;

import com.app.barbershopback.dto.ReserveAppointmentRequest;
import com.app.barbershopback.entities.Appointment;
import com.app.barbershopback.security.dto.AuthenticationResponse;
import com.app.barbershopback.security.user.User;
import com.app.barbershopback.services.AppointmentService;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;


    @GetMapping("/busy-periods")
    public List<Map<String, Object>> getBusyPeriods(@RequestParam String dateTime) {
        LocalDate date = LocalDate.parse(dateTime);
        return appointmentService.getBarbersBusyPeriods(date);
    }

    // Endpoint 2: Reserve an appointment
    @PostMapping("/reserve")
    public ResponseEntity<Object> reserveAppointment(@RequestBody ReserveAppointmentRequest request) {

        try{
            LocalDateTime dateTime = LocalDateTime.parse(request.getDateTime());
            return ResponseEntity.ok(appointmentService.reserveAppointment(request.getUserId(), request.getBarberId(), dateTime));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    // Endpoint 4: Cancel an appointment by ID
    @DeleteMapping("/{appointmentId}/cancel")
    public Map<String, String> cancelAppointment(@PathVariable Long appointmentId) {
        try {
            appointmentService.cancelAppointment(appointmentId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Appointment canceled successfully");
            return response;
        } catch (Exception e) {
            throw new IllegalArgumentException("Error canceling the appointment: " + e.getMessage());
        }
    }





    // Endpoint 3: Get appointments for a user sorted from newest to oldest
    @GetMapping("/user/{userId}")
    public List<Map<String, Object>> getUserAppointments(@PathVariable Long userId) {
        User user = new User();
        user.setId(userId);

        List<Appointment> appointments = appointmentService.getUserAppointments(user);

        // Transform the appointments list to the desired format
        return appointments.stream().map(appointment -> {
            Map<String, Object> response = new HashMap<>();
            response.put("id", appointment.getId());
            response.put("barberName", appointment.getBarber().getName());
            response.put("dateTime", appointment.getStartDate());
            return response;
        }).collect(Collectors.toList());
    }

}
