package com.app.barbershopback.repositories;

import com.app.barbershopback.entities.Barber;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BarberRepository extends JpaRepository<Barber, Long> {
}
