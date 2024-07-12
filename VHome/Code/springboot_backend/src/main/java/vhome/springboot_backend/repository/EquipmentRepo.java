package vhome.springboot_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import vhome.springboot_backend.entity.Equipment;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface EquipmentRepo extends JpaRepository<Equipment, Integer> {
    Equipment findByID(int equipmentID);

    @Query("select e from Equipment e where " +
            "lower(e.name) like lower(concat('%', :keyword, '%')) or " +
            "lower(e.brand) like lower(concat('%', :keyword, '%')) or " +
            "lower(cast(e.manufacture as string)) like lower(concat('%', :keyword, '%')) or " +
            "lower(e.status) like lower(concat('%', :keyword, '%')) or " +
            "lower(e.supplier) like lower(concat('%', :keyword, '%')) or " +
            "lower(e.storage) like lower(concat('%', :keyword, '%')) or " +
            "lower(e.building) like lower(concat('%', :keyword, '%'))"
    )
    List<Equipment> searchEquipments(String keyword);
}
