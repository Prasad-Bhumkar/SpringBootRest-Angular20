import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.html',
  styleUrls: ['./student-list.css']
})
export class StudentList implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => this.students = data,
      error: (err) => console.error('Error loading students', err)
    });
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => this.loadStudents(),
        error: (err) => console.error('Error deleting student', err)
      });
    }
  }
}
