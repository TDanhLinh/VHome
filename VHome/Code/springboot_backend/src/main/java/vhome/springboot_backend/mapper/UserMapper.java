package vhome.springboot_backend.mapper;

import vhome.springboot_backend.dto.UserDTO;
import vhome.springboot_backend.entity.User;

public class UserMapper {
    public static UserDTO mapToUserDto(User user){
        return new UserDTO(
                user.getId(),
                user.getName(),
                user.getPhoneNumber(),
                user.getEmail(),
                user.getUsername(),
                user.getPassword(),
                user.getRole(),
                user.getPosition()
        );
    }
}
