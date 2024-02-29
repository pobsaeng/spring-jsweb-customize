package com.app.ajax.repository;

import com.app.ajax.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query(value = "SELECT * FROM USERS u WHERE" +
            " u.status = 1" +
            " and username = ?" +
            " and password = ?", nativeQuery = true)
    Optional<User> findUserByUsernamePassword(String username, String password);
}
