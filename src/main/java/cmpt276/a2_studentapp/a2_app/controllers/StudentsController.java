package cmpt276.a2_studentapp.a2_app.controllers;

import java.util.List;

import org.hibernate.mapping.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import cmpt276.a2_studentapp.a2_app.models.Student;
import cmpt276.a2_studentapp.a2_app.models.StudentRepository;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;



@Controller
public class StudentsController {
    @Autowired
    private StudentRepository studentsRepository;

    public StudentsController() {
        // users.add(new Users("John", "password", 30));
        // users.add(new Users("Jane", "password", 25));
        // users.add(new Users("Doe", "password", 35));

    }

    @GetMapping("/students/all")
    public String getAllStudents(Model model) {
        List<Student> students = studentsRepository.findAll(); // db
        model.addAttribute("students", students);
        return "students/all";
    }

    @PostMapping("/students/add")
    public String addStudent(@RequestParam Map<String, String> newstudent, HttpServletResponse response) {
        System.out.println("ADD student");
        String newName = newstudent.get("name");
        int newWeight = Integer.parseInt(newstudent.get("weight"));
        int newHeight = Integer.parseInt(newstudent.get("height"));
        String newHairColor = newstudent.get("hairColor");
        int newGpa = Integer.parseInt(newstudent.get("hairColor"));
        String newGender = newstudent.get("gender");
        studentsRepository.save(new Students(newName,newHeight,newHeight,newHairColor,newGpa,newGender));
        response.setStatus(201);
        return "students/addedStudent";
    }
    
}   

