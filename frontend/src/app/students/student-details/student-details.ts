import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.html',
  styleUrls: ['./student-details.css']
})
export class StudentDetails implements OnInit {
  student: Student | undefined;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
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

  goBack(): void {
    this.router.navigate(['/students']);
  }
}
