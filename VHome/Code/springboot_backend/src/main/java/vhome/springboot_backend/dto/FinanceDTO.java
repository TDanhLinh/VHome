package vhome.springboot_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.cglib.core.Local;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class FinanceDTO {
    private int ID;
    private String name;
    private int servicesId;
    private String servicesName;
    private LocalDate createDay;
    private int customerId;
    private String customerName;
    private String room;
    private String building;
    private LocalDate term;
    private int money;
    private int paidMoney;
    private String status;
}
