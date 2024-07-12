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
@Table(name = "service")
public class Services {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int ID;
    @Column(name = "customer_ID")
    private int customerId;
    @Column(name = "fee_type")
    private String feeType;
    @Column(name = "unit_price")
    private int unitPrice;
    @Column(name = "unit")
    private String unit;
    @Column(name = "record_day")
    private LocalDate recordDay;
    @Column(name = "old_record")
    private int oldRecord;
    @Column(name = "old_record_picture")
    private String oldRecordPicture;
    @Column(name = "new_record")
    private int newRecord;
    @Column(name = "new_record_picture")
    private String newRecordPicture;
    @Column(name = "price")
    private int price;
}
