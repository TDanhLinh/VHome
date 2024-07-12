package vhome.springboot_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import vhome.springboot_backend.entity.Services;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface ServicesRepo extends JpaRepository<Services, Integer> {
    Services findByID(int servicesID);

    @Query("select s from Services s where " +
            "lower(s.feeType) like lower(concat('%', :keyword, '%')) or " +
            "lower(cast(s.recordDay as string)) like lower(concat('%', :keyword, '%'))"
    )
    List<Services> searchServices(String keyword);
}
