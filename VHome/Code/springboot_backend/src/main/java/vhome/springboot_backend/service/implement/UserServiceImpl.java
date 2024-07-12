package vhome.springboot_backend.service.implement;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import vhome.springboot_backend.dto.LoginDTO;
import vhome.springboot_backend.dto.UserDTO;
import vhome.springboot_backend.entity.User;
import vhome.springboot_backend.mapper.UserMapper;
import vhome.springboot_backend.repository.UserRepo;
import vhome.springboot_backend.response.LoginResponse;
import vhome.springboot_backend.service.UserService;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private UserRepo userRepo;

    private PasswordEncoder passwordEncoder;

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        User user = new User(
                userDTO.getId(),
                userDTO.getName(),
                userDTO.getPhoneNumber(),
                userDTO.getEmail(),
                userDTO.getUsername(),
                this.passwordEncoder.encode(userDTO.getPassword()),
                userDTO.getRole(),
                userDTO.getPosition()
        );
        User savedUser = userRepo.save(user);
        return UserMapper.mapToUserDto(savedUser);
    }

    @Override
    public LoginResponse loginResponse(LoginDTO loginDTO) {
        User loginedUser = userRepo.findByUsername(loginDTO.getUsername());
        if (loginedUser != null) {
            String password = loginDTO.getPassword();
            String encodedPassword = loginedUser.getPassword();
            boolean isPasswordRight = passwordEncoder.matches(password, encodedPassword);
            if (isPasswordRight) {
                Optional<User> user = userRepo.findOneByUsernameAndPassword(loginDTO.getUsername(), encodedPassword);
                if(user.isPresent()){
                    return new LoginResponse("Login Success", true);
                }
                else {
                    return new LoginResponse("Login Failed", false);
                }
            }
            else{
                return new LoginResponse("Password not match", false);
            }
        }
        else{
            return new LoginResponse("Username not exists", false);
        }
    }
}
