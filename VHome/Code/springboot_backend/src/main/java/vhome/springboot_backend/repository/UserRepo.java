package vhome.springboot_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import vhome.springboot_backend.entity.User;

import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

    Optional<User> findOneByUsernameAndPassword(String username, String password);

    User findByUsername(String username);
}
