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
public class EquipmentDTO {
    private int ID;
    private String name;
    private String brand;
    private String color;
    private int manufacture;
    private int price;
    private int quantity;
    private String status;
    private LocalDate guarantee;
    private String supplier;
    private String storage;
    private String building;
    private String note;
}
