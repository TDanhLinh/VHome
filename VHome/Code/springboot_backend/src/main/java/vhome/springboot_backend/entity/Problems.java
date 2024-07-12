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
@Table(name = "problem")
public class Problems {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int ID;
    @Column(name = "name")
    private String name;
    @Column(name = "building")
    private String building;
    @Column(name = "room")
    private String room;
    @Column(name = "description")
    private String description;
    @Column(name = "status")
    private String status;
    @Column(name = "type")
    private String type;
    @Column(name = "implementer")
    private String implementer;
    @Column(name = "term")
    private LocalDate term;
}
