package com.app.barbershopback.services;

import com.app.barbershopback.entities.Appointment;
import com.app.barbershopback.entities.Barber;
import com.app.barbershopback.security.repo.UserRepository;
import com.app.barbershopback.repositories.AppointmentRepository;
import com.app.barbershopback.repositories.BarberRepository;
import com.app.barbershopback.security.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private BarberRepository barberRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Map<String, Object>> getBarbersBusyPeriods(LocalDate date) {
        // Retrieve all barbers from the database
        List<Barber> allBarbers = barberRepository.findAll();

        // Fetch appointments between 9:00 and 22:00 on the given date
        List<Appointment> appointments = appointmentRepository.findByStartDateBetween(
                date.atStartOfDay(), date.plusDays(1).atStartOfDay());

        // Initialize a map to store barber busy periods
        Map<Long, List<Integer>> barberBusyPeriods = new HashMap<>();

        // Populate the map with empty lists for all barbers
        for (Barber barber : allBarbers) {
            barberBusyPeriods.put(barber.getId(), new ArrayList<>());
        }

        // Populate the map with appointment start hours
        for (Appointment appointment : appointments) {
            barberBusyPeriods
                    .computeIfAbsent(appointment.getBarber().getId(), k -> new ArrayList<>())
                    .add(appointment.getStartDate().getHour());
        }

        // Transform the data into the required format
        List<Map<String, Object>> result = new ArrayList<>();
        for (Barber barber : allBarbers) {
            Map<String, Object> barberInfo = new HashMap<>();
            barberInfo.put("id", barber.getId());
            barberInfo.put("name", barber.getName());
            barberInfo.put("appointments", barberBusyPeriods.get(barber.getId()));
            result.add(barberInfo);
        }

        return result;
    }

    public Appointment reserveAppointment(Integer userId, Long barberId, LocalDateTime dateTime) {
        // Validate user existence
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found"));

        // Validate barber existence
        Barber barber = barberRepository.findById(barberId)
                .orElseThrow(() -> new NoSuchElementException("Barber not found"));

        // Validate reservation date
        LocalDateTime today = LocalDateTime.now();
        if (dateTime.isBefore(today)) {
            throw new IllegalArgumentException("Reservation date cannot be in the past");
        }

        // Check if the barber is busy at the given date and hour
        LocalDateTime startHour = dateTime.withMinute(0).withSecond(0).withNano(0);
        LocalDateTime endHour = startHour.plusHours(1);

        boolean isBarberBusy = appointmentRepository.existsByBarberAndStartDateBetween(barber, startHour, endHour);

        if (isBarberBusy) {
            throw new IllegalStateException("Barber is busy at the requested time");
        }

        // Create and save the new appointment
        Appointment appointment = new Appointment();
        appointment.setUser(user);
        appointment.setBarber(barber);
        appointment.setStartDate(dateTime);

        return appointmentRepository.save(appointment);
    }


    public List<Appointment> getUserAppointments(User user) {
        // Validate user existence
        userRepository.findById((int) user.getId().longValue())
                .orElseThrow(() -> new NoSuchElementException("User not found"));

        List<Appointment> appointments = appointmentRepository.findByUser(user);
        return appointments.stream()
                .sorted(Comparator.comparing(Appointment::getStartDate).reversed())
                .collect(Collectors.toList());
    }

    public void cancelAppointment(Long appointmentId) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new NoSuchElementException("Appointment not found"));

        // Perform additional checks if necessary later

        // Delete the appointment
        appointmentRepository.delete(appointment);
    }
}
