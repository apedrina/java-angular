package com.alissonpedrina.springjwt.controllers;

import com.alissonpedrina.springjwt.models.MyUserPrincipal;
import com.alissonpedrina.springjwt.models.RoleEntity;
import com.alissonpedrina.springjwt.models.UserEntity;
import com.alissonpedrina.springjwt.payload.request.LoginRequest;
import com.alissonpedrina.springjwt.payload.request.SignupRequest;
import com.alissonpedrina.springjwt.payload.response.JwtResponse;
import com.alissonpedrina.springjwt.payload.response.MessageResponse;
import com.alissonpedrina.springjwt.repository.RoleRepository;
import com.alissonpedrina.springjwt.repository.UserRepository;
import com.alissonpedrina.springjwt.security.jwt.JwtUtils;
import com.alissonpedrina.springjwt.security.services.SecurityServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final JwtUtils jwtUtils;

    private final SecurityServiceImpl securityService;

    private final PasswordEncoder passwordEncoder;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        var jwt = jwtUtils.generateJwtToken(authentication);
        var userDetails = (MyUserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(new JwtResponse(jwt,
                2l,
                userDetails.getUsername(),
                userDetails.getEmail(),
                userDetails.getRoles().stream().map(auth -> auth.getName()).collect(Collectors.toList())));

    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }
        var user = new UserEntity(signUpRequest.getUsername(),
                signUpRequest.getPassword(),
                signUpRequest.getEmail(),
                new HashSet<RoleEntity>()
        );
        var strRoles = signUpRequest.getRole();
        var roles = new HashSet<RoleEntity>();
        if (strRoles == null) {
            var userRole = roleRepository.findByName("")
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        var adminRole = roleRepository.findByName("ROLE_ADMIN")
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "user":
                        var modRole = roleRepository.findByName("ROLE_USER")
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);

                        break;
                    default:
                        var userRole = roleRepository.findByName("ROLE_NEW_USER")
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }
        user.setRoles(roles);
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));

    }

}
