package com.alissonpedrina.springjwt.security.services;

import com.alissonpedrina.springjwt.models.MyUserPrincipal;
import com.alissonpedrina.springjwt.models.RoleEntity;
import com.alissonpedrina.springjwt.models.UserEntity;
import com.alissonpedrina.springjwt.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
        var grantedAuthorities = new HashSet<GrantedAuthority>();
        for (RoleEntity role : user.getRoles()) {
            grantedAuthorities.add(new SimpleGrantedAuthority(role.getName()));
        }
        return MyUserPrincipal.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .email(user.getEmail())
                .roles(user.getRoles())
                .build();

    }

}
