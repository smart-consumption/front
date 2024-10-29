import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-add-user-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserModalComponent {
  userForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddUserModalComponent>, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: [''],
      name: [''],
      cityName: [''],
      cityDepartment: ['']
    });
  }

  save() {
    // Mapea los datos del formulario al formato del objeto User
    const newUser: User = {
      id: '',
      username: this.userForm.value.username,
      name: this.userForm.value.name,
      reviews: null,
      watchList: [],
      city: {
        id: '',
        name: this.userForm.value.cityName,
        department: this.userForm.value.cityDepartment
      }
    };

    // Cierra el modal y devuelve el usuario creado
    this.dialogRef.close(newUser);
  }

  close() {
    this.dialogRef.close();
  }
}
