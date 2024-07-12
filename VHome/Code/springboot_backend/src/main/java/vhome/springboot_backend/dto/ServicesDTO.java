package vhome.springboot_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ServicesDTO {
    private int ID;
    private int customerId;
    private String customerName;
    private String feeType;
    private int unitPrice;
    private String unit;
    private LocalDate recordDay;
    private int oldRecord;
    //private MultipartFile oldRecordPictureFile;
    private String oldRecordPicture;
    private int newRecord;
    private String newRecordPicture;
    private int price;
}
