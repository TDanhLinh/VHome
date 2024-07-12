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
@Table(name = "finance")

public class Finance {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int ID;
    @Column(name = "name")
    private String name;
    @Column(name = "service_ID")
    private int servicesId;
    @Column(name = "create_day")
    private LocalDate createDay;
    @Column(name = "customer_ID")
    private int customerId;
    @Column(name = "term")
    private LocalDate term;
    @Column(name = "money")
    private int money;
    @Column(name = "paid_money")
    private int paidMoney;
    @Column(name = "status")
    private String status;
}
