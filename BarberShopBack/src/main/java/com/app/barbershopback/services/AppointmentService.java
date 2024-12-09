package com.app.barbershopback.services;

import com.app.barbershopback.entities.Appointment;
import com.app.barbershopback.entities.Barber;
import com.app.barbershopback.security.repo.UserRepository;
import com.app.barbershopback.repositories.AppointmentRepository;
import com.app.barbershopback.repositories.BarberRepository;
import com.app.barbershopback.security.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Map<Barber, List<Integer>> getBarbersBusyPeriods(LocalDateTime date) {
        List<Appointment> appointments = appointmentRepository.findByStartDateBetween(
                date.withHour(9), date.withHour(22));

        Map<Barber, List<Integer>> barberBusyPeriods = new HashMap<>();

        for (Appointment appointment : appointments) {
            barberBusyPeriods
                    .computeIfAbsent(appointment.getBarber(), k -> new ArrayList<>())
                    .add(appointment.getStartDate().getHour());
        }

        return barberBusyPeriods;
    }

    public Appointment reserveAppointment(Integer userId, Long barberId, LocalDateTime dateTime) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found"));
        Barber barber = barberRepository.findById(barberId)
                .orElseThrow(() -> new NoSuchElementException("Barber not found"));

        Appointment appointment = new Appointment();
        appointment.setUser(user);
        appointment.setBarber(barber);
        appointment.setStartDate(dateTime);

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getUserAppointments(User user) {
        List<Appointment> appointments = appointmentRepository.findByUser(user);
        return appointments.stream()
                .sorted(Comparator.comparing(Appointment::getStartDate).reversed())
                .collect(Collectors.toList());
    }
}
