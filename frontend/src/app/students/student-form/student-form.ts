import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.html',
  styleUrls: ['./student-form.css']
})
export class StudentForm implements OnInit {
  student: Student = { id: 0, firstName: '', lastName: '', email: '' };
  isEditMode = false;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      const id = Number(idParam);
      if (!isNaN(id)) {
        this.studentService.getStudentById(id).subscribe({
          next: (data) => this.student = data,
          error: (err) => console.error('Error loading student', err)
        });
      } else {
        console.error('Invalid student id:', idParam);
      }
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.student.id !== undefined) {
      this.studentService.updateStudent(this.student.id, this.student).subscribe({
        next: () => this.router.navigate(['/students']),
        error: (err) => console.error('Error updating student', err)
      });
    } else {
      this.studentService.createStudent(this.student).subscribe({
        next: () => this.router.navigate(['/students']),
        error: (err) => console.error('Error creating student', err)
      });
    }
  }
}
