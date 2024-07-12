package vhome.springboot_backend.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vhome.springboot_backend.dto.LoginDTO;
import vhome.springboot_backend.dto.UserDTO;
import vhome.springboot_backend.response.LoginResponse;
import vhome.springboot_backend.service.UserService;

@RestController
@CrossOrigin
@AllArgsConstructor
@RequestMapping("/user")
public class LoginAndRegisterController {
    private UserService userService;

    @PostMapping(path = "/register")
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        UserDTO savedUser = userService.createUser(userDTO);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO){
        LoginResponse loginResponse = userService.loginResponse(loginDTO);
        return ResponseEntity.ok(loginResponse);
    }
}
