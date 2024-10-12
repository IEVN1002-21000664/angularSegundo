import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Añadir CommonModule aquí
  templateUrl: './zodiaco.component.html',
  styles: []
})
export class ZodiacoComponent implements OnInit {
  formGroup!: FormGroup;
  nombreCompleto: string = '';
  edad: number = 0;
  signo: string = '';
  mostrarMensaje: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      dia: [''],
      mes: [''],
      anio: [''],
      sexo: ['masculino']
    });
  }

  calcularEdad(anio: number, mes: number, dia: number): number {
    const hoy = new Date();
    let edad = hoy.getFullYear() - anio;
    const mesActual = hoy.getMonth() + 1;
    const diaActual = hoy.getDate();

    if (mes > mesActual || (mes === mesActual && dia > diaActual)) {
      edad--;
    }

    return edad;
  }

  calcularSigno(dia: number, mes: number): string {
    const signos = [
      { nombre: 'Capricornio', inicio: { mes: 12, dia: 22 }, fin: { mes: 1, dia: 19 } },
      { nombre: 'Acuario', inicio: { mes: 1, dia: 20 }, fin: { mes: 2, dia: 18 } },
      { nombre: 'Piscis', inicio: { mes: 2, dia: 19 }, fin: { mes: 3, dia: 20 } },
    ];

    for (const signo of signos) {
      if (
        (mes === signo.inicio.mes && dia >= signo.inicio.dia) ||
        (mes === signo.fin.mes && dia <= signo.fin.dia)
      ) {
        return signo.nombre;
      }
    }
    return 'Desconocido';
  }

  onImprimir(): void {
    const { nombre, apaterno, amaterno, dia, mes, anio } = this.formGroup.value;
    this.nombreCompleto = `${nombre} ${apaterno} ${amaterno}`;
    this.edad = this.calcularEdad(anio, mes, dia);
    this.signo = this.calcularSigno(dia, mes);
    this.mostrarMensaje = true;
  }
}
