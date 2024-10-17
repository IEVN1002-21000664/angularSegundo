import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common'; 

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './zodiaco.component.html',
  styles: []
})
export default class ZodiacoComponent implements OnInit {
  formGroup!: FormGroup;
  nombreCompleto!: string;
  edad!: number;
  signoChino!: string;
  imagenSigno!: string;
  mostrarMensaje = false;

  signosChinos = [
    { signo: 'Rata', imagen: 'https://www.clarin.com/img/westernastrology/rata.svg' },
    { signo: 'Buey', imagen: 'https://www.clarin.com/img/westernastrology/bufalo.svg' },
    { signo: 'Tigre', imagen: 'https://www.clarin.com/img/westernastrology/tigre.svg' },
    { signo: 'Conejo', imagen: 'https://www.clarin.com/img/westernastrology/conejo.svg' },
    { signo: 'Dragón', imagen: 'https://www.clarin.com/img/westernastrology/dragon.svg' },
    { signo: 'Serpiente', imagen: 'https://www.clarin.com/img/westernastrology/serpiente.svg' },
    { signo: 'Caballo', imagen: 'https://www.clarin.com/img/westernastrology/caballo.svg' },
    { signo: 'Cabra', imagen: 'https://www.clarin.com/img/westernastrology/cabra.svg' },
    { signo: 'Mono', imagen: 'https://www.clarin.com/img/westernastrology/mono.svg' },
    { signo: 'Gallo', imagen: 'https://www.clarin.com/img/westernastrology/gallo.svg' },
    { signo: 'Perro', imagen: 'https://www.clarin.com/img/westernastrology/perro.svg' },
    { signo: 'Cerdo', imagen: 'https://www.clarin.com/img/westernastrology/chancho.svg' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      dia: [''],
      mes: [''],
      anio: [''],
      sexo: ['']
    });
  }

  onSubmit(): void {
    const { nombre, apaterno, amaterno, dia, mes, anio } = this.formGroup.value;
    this.nombreCompleto = `${nombre} ${apaterno} ${amaterno}`;
  
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear();
    const mesActual = fechaActual.getMonth() + 1; 
    const diaActual = fechaActual.getDate();
  
    this.edad = anioActual - anio;
    if (mes > mesActual || (mes === mesActual && dia > diaActual)) {
      this.edad--; 
    }
  
    const signoIndex = (anio - 4) % 12;
  
    if (signoIndex >= 0 && signoIndex < this.signosChinos.length) {
      const signo = this.signosChinos[signoIndex];
      this.signoChino = signo.signo;
      this.imagenSigno = signo.imagen;
    } else {
      this.signoChino = 'Signo no encontrado';
      this.imagenSigno = ''; 
    }
  
    this.mostrarMensaje = true;
  }
  
}
