import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms';

interface Empleado {
  matricula: string;
  nombre: string;
  email: string;
  edad: number;
  horas: number;
}

@Component({
  selector: 'app-empleados',
  standalone: true,
  templateUrl: './empleados.component.html',
  imports: [ReactiveFormsModule, CommonModule]  
})
export default class EmpleadosComponent implements OnInit {
  formGroup!: FormGroup;
  empleados: Empleado[] = [];
  isEditMode: boolean = false;
  empleadoIndex!: number;
  mostrarTabla: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      this.empleados = JSON.parse(empleadosGuardados);
    }
    this.formGroup = this.fb.group({
      matricula: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      edad: ['', Validators.required],
      horas: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const empleado: Empleado = this.formGroup.value;
    const matriculaExists = this.empleados.some(e => e.matricula === empleado.matricula);

    if (!matriculaExists) {
      this.empleados.push(empleado);
      localStorage.setItem('empleados', JSON.stringify(this.empleados));
      this.formGroup.reset();
    } else {
      alert('La matrícula ya existe.');
    }
  }

  editarEmpleado(index: number): void {
    this.isEditMode = true;
    this.empleadoIndex = index;
    const empleado = this.empleados[index];
    this.formGroup.patchValue(empleado);
    this.formGroup.get('matricula')?.disable();
  }

  modificarEmpleado(): void {
    const empleadoModificado: Empleado = this.formGroup.getRawValue();
    this.empleados[this.empleadoIndex] = empleadoModificado;
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
    this.isEditMode = false;
    this.formGroup.reset();
    this.formGroup.get('matricula')?.enable();
  }

  cancelarEdicion(): void {
    this.isEditMode = false;
    this.formGroup.reset();
    this.formGroup.get('matricula')?.enable();
  }

  eliminarEmpleado(index: number): void {
    this.empleados.splice(index, 1);
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }

  calcularPago(horas: number): number {
    const tasaNormal = 70;
    const tasaExtra = 140;
    if (horas > 40) {
      return (40 * tasaNormal) + ((horas - 40) * tasaExtra);
    } else {
      return horas * tasaNormal;
    }
  }

  calcularTotal(): number {
    return this.empleados.reduce((total, empleado) => total + this.calcularPago(empleado.horas), 0);
  }
  toggleTabla(): void {
    this.mostrarTabla = !this.mostrarTabla;
  }
}
