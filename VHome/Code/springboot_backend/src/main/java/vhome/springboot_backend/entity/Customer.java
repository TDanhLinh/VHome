package vhome.springboot_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "customer")
public class Customer {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int ID;
    @Column(name = "name")
    private String name;
    @Column(name = "phone_number")
    private String phoneNumber;
    @Column(name = "email")
    private String email;
    @Column(name = "birth")
    private LocalDate birth;
    @Column(name = "room")
    private String room;
    @Column(name = "building")
    private String building;
    @Column(name = "sex")
    private String sex;
    @Column(name = "cccd")
    private String cccd;
    @Column(name = "home_town")
    private String homeTown;
    @Column(name = "bank_account")
    private String bankAccount;
    @Column(name = "bank")
    private String bank;
    @Column(name = "job")
    private String job;
    @Column(name = "communicator")
    private String communicator;
    @Column(name = "communicator_phone")
    private String communicatorPhone;
}
