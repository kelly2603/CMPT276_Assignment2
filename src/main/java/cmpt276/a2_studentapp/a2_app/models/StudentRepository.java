package cmpt276.a2_studentapp.a2_app.models;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student,Integer> {
    List<Student> findByName(String name);
    List<Student> findByNameAndHeight(String name, int height);

}
