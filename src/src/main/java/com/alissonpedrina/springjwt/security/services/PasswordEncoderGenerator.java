package com.alissonpedrina.springjwt.security.services;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncoderGenerator {

    public static void main(String[] args) {
        int i = 0;
        while (i < 10) {
            String password = "root";
            var passwordEncoder = new BCryptPasswordEncoder();
            var hashedPassword = passwordEncoder.encode(password);
            System.out.println(hashedPassword);
            i++;

        }

    }
}