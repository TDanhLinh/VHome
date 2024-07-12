package vhome.springboot_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import vhome.springboot_backend.entity.Customer;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface CustomerRepo extends JpaRepository<Customer, Integer> {
    Customer findByID(int customerID);

    @Query("select c from Customer c where " +
            "lower(c.name) like lower(concat('%', :keyword, '%')) or " +
            "lower(c.phoneNumber) like lower(concat('%', :keyword, '%')) or " +
            "lower(c.cccd) like lower(concat('%', :keyword, '%')) or " +
            "lower(c.room) like lower(concat('%', :keyword, '%')) or " +
            "lower(c.building) like lower(concat('%', :keyword, '%'))"
    )
    List<Customer> searchCustomers(String keyword);
}
