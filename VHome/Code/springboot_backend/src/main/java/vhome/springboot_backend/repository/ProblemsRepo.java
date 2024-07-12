package vhome.springboot_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import vhome.springboot_backend.entity.Problems;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface ProblemsRepo extends JpaRepository<Problems, Integer> {
    Problems findByID(int problemID);

    @Query("select p from Problems p where " +
            "lower(p.name) like lower(concat('%', :keyword, '%')) or " +
            "lower(p.building) like lower(concat('%', :keyword, '%')) or " +
            "lower(cast(p.term as string)) like lower(concat('%', :keyword, '%')) or " +
            "lower(p.type) like lower(concat('%', :keyword, '%'))"
    )
    List<Problems> searchProblems(String keyword);
}
