package com.app.barbershopback.security;


import com.app.barbershopback.security.user.User;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public record DemoController() {


    @GetMapping("/demo")
    public String sayHello(Authentication authentication) {
        return """
                Hello %s 🥳 !
                Welcome to a very secured page  😱
                """.formatted(getName(authentication));
    }

    @GetMapping("/user/demo")
    @PreAuthorize("hasRole('USER')")
    public String sayHelloUser(Authentication authentication) {
        return """
                Hello %s 🥳 !
                Welcome to a very secured page  User 😱
                """.formatted(getName(authentication));
    }


    @GetMapping("admin/demo")
    @PreAuthorize("hasRole('ADMIN')")
    public String sayHelloAddmin(Authentication authentication) {
        return """
                Hello %s 🥳 !
                Welcome to a very secured page Admin  😱
                """.formatted(getName(authentication));
    }






    private String getName(Authentication authentication) {
        return Optional.of(authentication)
                .filter(User.class::isInstance)
                .map(User.class::cast)
                .map(User::getEmail)
                .orElseGet(authentication::getName);
    }

}
