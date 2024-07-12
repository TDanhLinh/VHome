package vhome.springboot_backend.mapper;

import vhome.springboot_backend.dto.EquipmentDTO;
import vhome.springboot_backend.entity.Equipment;

public class EquipmentMapper {
    public static EquipmentDTO mapToEquipmentDTO(Equipment equipment) {
        return new EquipmentDTO(
                equipment.getID(),
                equipment.getName(),
                equipment.getBrand(),
                equipment.getColor(),
                equipment.getManufacture(),
                equipment.getPrice(),
                equipment.getQuantity(),
                equipment.getStatus(),
                equipment.getGuarantee(),
                equipment.getSupplier(),
                equipment.getStorage(),
                equipment.getBuilding(),
                equipment.getNote()
        );
    }

    public static Equipment mapToEquipment(EquipmentDTO equipmentDto) {
        return new Equipment(
                equipmentDto.getID(),
                equipmentDto.getName(),
                equipmentDto.getBrand(),
                equipmentDto.getColor(),
                equipmentDto.getManufacture(),
                equipmentDto.getPrice(),
                equipmentDto.getQuantity(),
                equipmentDto.getStatus(),
                equipmentDto.getGuarantee(),
                equipmentDto.getSupplier(),
                equipmentDto.getStorage(),
                equipmentDto.getBuilding(),
                equipmentDto.getNote()
        );
    }

    public static Equipment updateEquipment(Equipment equipment, EquipmentDTO equipmentDTO) {
        equipment.setName(equipmentDTO.getName());
        equipment.setBrand(equipmentDTO.getBrand());
        equipment.setColor(equipmentDTO.getColor());
        equipment.setManufacture(equipmentDTO.getManufacture());
        equipment.setPrice(equipmentDTO.getPrice());
        equipment.setQuantity(equipmentDTO.getQuantity());
        equipment.setStatus(equipmentDTO.getStatus());
        equipment.setGuarantee(equipmentDTO.getGuarantee());
        equipment.setSupplier(equipmentDTO.getSupplier());
        equipment.setStorage(equipmentDTO.getStorage());
        equipment.setBuilding(equipmentDTO.getBuilding());
        equipment.setNote(equipmentDTO.getNote());

        return equipment;
    }
}
