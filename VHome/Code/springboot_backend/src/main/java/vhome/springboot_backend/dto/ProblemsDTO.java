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
public class ProblemsDTO {
    private int ID;
    private String name;
    private String building;
    private String room;
    private String description;
    private String status;
    private String type;
    private String implementer;
    private LocalDate term;
}
