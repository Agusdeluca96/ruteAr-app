import { Component, OnInit } from '@angular/core';
import { Ruta } from '../_models';
import { RutaService } from '../_services';
import { Router } from "@angular/router";
import swal from 'sweetalert2';

@Component({
  selector: 'app-ruta-new',
  templateUrl: './ruta-new.component.html',
  styleUrls: ['./ruta-new.component.css']
})
export class RutaNewComponent implements OnInit {

  constructor(private rutaService: RutaService, private router: Router) { }

  msjExito = '';
  ruta = new Ruta('', '', '', '', '', '', '', '', '', '', '', '', '', '');
  submitted = false;

  onSubmit(form) {
    this.submitted = true;
    this.rutaService.add(this.ruta).subscribe(
      data => {
        swal({
          type: 'success',
          title: 'Ruta agregada con exito!',
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigate(['home/ruta/list']);
      },
      error => swal({
        type: 'error',
        title: 'Ha ocurrido un error!',
        showConfirmButton: false,
        timer: 2000
      }));
    form.resetForm();
  }

  ngOnInit() {
  }

}
