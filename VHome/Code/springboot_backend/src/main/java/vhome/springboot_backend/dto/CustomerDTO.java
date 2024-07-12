package vhome.springboot_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class CustomerDTO {
    private int ID;
    private String name;
    private String phoneNumber;
    private String email;
    private LocalDate birth;
    private String room;
    private String building;
    private String sex;
    private String cccd;
    private String homeTown;
    private String bankAccount;
    private String bank;
    private String job;
    private String communicator;
    private String communicatorPhone;
}
