package vhome.springboot_backend.mapper;

import vhome.springboot_backend.dto.ServicesDTO;
import vhome.springboot_backend.entity.Services;

public class ServicesMapper {
    public static ServicesDTO mapToServicesDTO(Services services, String customerName){
        return new ServicesDTO(
                services.getID(),
                services.getCustomerId(),
                customerName,
                services.getFeeType(),
                services.getUnitPrice(),
                services.getUnit(),
                services.getRecordDay(),
                services.getOldRecord(),
                services.getOldRecordPicture(),
                services.getNewRecord(),
                services.getNewRecordPicture(),
                services.getPrice()
        );
    }

    public static ServicesDTO mapToServicesDTO(Services services){
        return new ServicesDTO(
                services.getID(),
                services.getCustomerId(),
                null,
                services.getFeeType(),
                services.getUnitPrice(),
                services.getUnit(),
                services.getRecordDay(),
                services.getOldRecord(),
                services.getOldRecordPicture(),
                services.getNewRecord(),
                services.getNewRecordPicture(),
                services.getPrice()
        );
    }

    public static Services mapToServices(ServicesDTO servicesDto){
        return new Services(
                servicesDto.getID(),
                servicesDto.getCustomerId(),
                servicesDto.getFeeType(),
                servicesDto.getUnitPrice(),
                servicesDto.getUnit(),
                servicesDto.getRecordDay(),
                servicesDto.getOldRecord(),
                servicesDto.getOldRecordPicture(),
                servicesDto.getNewRecord(),
                servicesDto.getNewRecordPicture(),
                servicesDto.getPrice()
        );
    }

    public static Services updateServices(Services services, ServicesDTO servicesDTO) {
        services.setCustomerId(servicesDTO.getCustomerId());
        services.setFeeType(servicesDTO.getFeeType());
        services.setUnitPrice(servicesDTO.getUnitPrice());
        services.setUnit(servicesDTO.getUnit());
        services.setRecordDay(servicesDTO.getRecordDay());
        services.setOldRecord(servicesDTO.getOldRecord());
        //services.setOldRecordPicture(imageURL);
        services.setNewRecord(servicesDTO.getNewRecord());
        services.setNewRecordPicture(servicesDTO.getNewRecordPicture());
        services.setPrice(servicesDTO.getPrice());

        return services;
    }
}
