package vhome.springboot_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import vhome.springboot_backend.entity.Finance;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface FinanceRepo extends JpaRepository<Finance, Integer> {
    Finance findByID(int financeID);

    @Query("select f from Finance f where " +
            "lower(cast(f.customerId as string)) like lower(concat('%', :keyword, '%')) or " +
            "lower(f.name) like lower(concat('%', :keyword, '%')) or " +
            "lower(cast(f.createDay as string)) like lower(concat('%', :keyword, '%')) or " +
            "lower(cast(f.term as string)) like lower(concat('%', :keyword, '%')) or " +
            "lower(cast(f.money as string)) like lower(concat('%', :keyword, '%')) or " +
            "lower(cast(f.paidMoney as string)) like lower(concat('%', :keyword, '%')) or " +
            "lower(f.status) like lower(concat('%', :keyword, '%'))"
    )
    List<Finance> searchFinances(String keyword);
}
