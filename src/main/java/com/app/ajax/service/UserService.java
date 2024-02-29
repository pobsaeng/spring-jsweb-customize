package com.app.ajax.service;

import com.app.ajax.model.User;
import com.app.ajax.model.request.UserRequest;
import com.app.ajax.repository.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Log4j2
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public String verifyLogin(UserRequest userRequest) {
        log.info("[verifyLogin] Username : {}, Password : {}",
                userRequest.getUsername(),
                userRequest.getPassword());
        Optional<User> user = userRepository.findUserByUsernamePassword(
                userRequest.getUsername(),
                userRequest.getPassword());

        if (user.isPresent()) {
            return "Verify login success";

        } else {
            throw new RuntimeException("Not found username or password");
        }
    }
}
