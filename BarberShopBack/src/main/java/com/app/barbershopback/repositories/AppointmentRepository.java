package com.app.barbershopback.repositories;

import com.app.barbershopback.entities.Appointment;
import com.app.barbershopback.entities.Barber;
import com.app.barbershopback.security.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByStartDateBetween(LocalDateTime start, LocalDateTime end);
    List<Appointment> findByUser(User user);

    boolean existsByBarberAndStartDateBetween(Barber barber, LocalDateTime startHour, LocalDateTime endHour);
}
