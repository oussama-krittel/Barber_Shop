package com.app.barbershopback.security.service;

import com.app.barbershopback.security.dto.AuthenticationRequest;
import com.app.barbershopback.security.dto.AuthenticationResponse;
import com.app.barbershopback.security.dto.RegisterRequest;
import com.app.barbershopback.security.user.Role;
import com.app.barbershopback.security.user.User;
import com.app.barbershopback.security.repo.UserRepository;
import com.app.barbershopback.security.utils.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public record AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {

    public AuthenticationResponse register(RegisterRequest request) {
        // Check if the email already exists
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new IllegalArgumentException("Email is already in use");
        }

        final var user = new User(null,
                request.firstname(),
                request.lastname(),
                request.email(),
                passwordEncoder.encode(request.password()),
                Role.USER);
        userRepository.save(user);
        final var token = JwtService.generateToken(user);
        return new AuthenticationResponse(token);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.email(),
                            request.password()
                    )
            );
        } catch (Exception e) {
            throw new IllegalArgumentException("Incorrect email or password");
        }

        final var user = userRepository.findByEmail(request.email()).orElseThrow();
        final var token = JwtService.generateToken(user);
        return new AuthenticationResponse(token);
    }
}
