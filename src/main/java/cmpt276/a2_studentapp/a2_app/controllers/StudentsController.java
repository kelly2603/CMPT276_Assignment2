package cmpt276.a2_studentapp.a2_app.controllers;

import java.util.List;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import cmpt276.a2_studentapp.a2_app.models.Student;
import cmpt276.a2_studentapp.a2_app.models.StudentRepository;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;



@Controller
public class StudentsController {
    @Autowired
    private StudentRepository studentsRepo;

    //Get all students from database and dispay them
    @GetMapping("/students/datatable")
    public String getAllStudents(Model model) {
        List<Student> students = studentsRepo.findAll(); // db
        model.addAttribute("std", students);
        return "students/datatable";
    }
    
    //adding student process after form is submitted
    @PostMapping("/students/add")
    public String addStudent(@RequestParam Map<String, String> newstudent, HttpServletResponse response, Model model) {
        System.out.println("ADD student");
        String newName = newstudent.get("name");
        int newWeight = Integer.parseInt(newstudent.get("weight"));
        int newHeight = Integer.parseInt(newstudent.get("height"));
        String newHairColor = newstudent.get("hairColor");
        int newGpa = Integer.parseInt(newstudent.get("gpa"));
        String newGender = newstudent.get("gender");

        try {
            // Save the student to the database
            Student savedStudent = studentsRepo.save(new Student(newName, newWeight, newHeight, newHairColor, newGpa, newGender));
    
            // Check if the save operation was successful
            if (savedStudent != null) {
                // If successful, add a success message to the model
                model.addAttribute("successMessage", "Student added successfully.");
            } else {
                // If not successful, add an error message to the model
                model.addAttribute("errorMessage", "Failed to add student. Please try again.");
            }
        } catch (Exception e) {
            // If an exception occurs during the save operation, add an error message to the model
            model.addAttribute("errorMessage", "An error occurred while adding the student: " + e.getMessage());
        }

        return "redirect:/students/datatable";
    }
    
    //deleting student
    @DeleteMapping("/students/{studentID}")
    public ResponseEntity<String> deleteStudent(int studentId){
        List<Student> studentList = studentsRepo.findBySid(studentId);
        if(studentList.isEmpty()){
            return ResponseEntity.badRequest().body("Can't find target student");
        }else{
            Student student = studentList.get(0);
            studentsRepo.delete(student);
            return ResponseEntity.ok("Deleted Student");
        }
    }

    @PostMapping("/students/edit")
    public String editStudent(@RequestParam Map<String, String> editstudent, HttpServletResponse response, Model model) {
        System.out.println("Edit student");

        int studentID = Integer.parseInt(editstudent.get("studentId"));
        String newName = editstudent.get("name");
        int newWeight = Integer.parseInt(editstudent.get("weight"));
        int newHeight = Integer.parseInt(editstudent.get("height"));
        String newHairColor = editstudent.get("hairColor");
        int newGpa = Integer.parseInt(editstudent.get("hairColor"));
        String newGender = editstudent.get("gender");
        
        List<Student> studentList = studentsRepo.findBySid(studentID); //get student by sid

        // if(studentList.isEmpty()){
        //     model.addAttribute("errorMessage", "Failed to add student. Please try again.");
        //     return "redirect:/students/datatable";
        // }else{
        //     Student student = studentList.get(0);
        //     student.setName(newName);
        //     student.setWeight(newWeight);
        //     student.setHeight(newHeight);
        //     student.setGpa(newGpa);
        //     student.setHairColor(newHairColor);
        //     student.setGender(newGender);
        //     return "redirect:/students/datatable";
            
        // }

        if(studentList.isEmpty()){
            model.addAttribute("errorMessage", "There is no such student. Please try again.");
        }else{
            try {
                Student student = studentList.get(0);
                student.setName(newName);
                student.setWeight(newWeight);
                student.setHeight(newHeight);
                student.setGpa(newGpa);
                student.setHairColor(newHairColor);
                student.setGender(newGender);
    
                model.addAttribute("successMessage", "Student added successfully.");
            } catch (Exception e) {
                // If an exception occurs during the save operation, add an error message to the model
                model.addAttribute("errorMessage", "An error occurred while adding the student: " + e.getMessage());
            }
        }
        return "redirect:/students/datatable";
    }

    @GetMapping("/students/display")
    public String getStudentsBoxes(Model model) {
        List<Student> students = studentsRepo.findAll(); // db
        model.addAttribute("std", students);
        return "students/display";
    }

}   

