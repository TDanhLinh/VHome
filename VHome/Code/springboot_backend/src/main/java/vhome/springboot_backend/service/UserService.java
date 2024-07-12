package vhome.springboot_backend.service;

import vhome.springboot_backend.dto.LoginDTO;
import vhome.springboot_backend.dto.UserDTO;
import vhome.springboot_backend.response.LoginResponse;

public interface UserService {

    UserDTO createUser(UserDTO userDTO);

    LoginResponse loginResponse(LoginDTO loginDTO);
}
