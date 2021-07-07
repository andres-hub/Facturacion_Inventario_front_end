import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async subirArchivo(archivo: File, arquetipo: 'usuarios', id: string = ''){

    try {
      
      const url = `${base_url}/upload/${arquetipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', archivo);
      
      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      })

      const data = await resp.json();
      
      if(data.ok){

        Swal.fire({
          title: 'Actualización exitosa',
          text: `${data.msg}`,
          icon: 'success',
          confirmButtonText: 'Ok'
        });

        return data.nombreArchivo
      }else{

        Swal.fire({
          title: '¡Error!',
          text: data.error.msg,
          icon: 'error',
          confirmButtonText: 'Ok'
        }); 

        return false;
        
      }

    } catch (error) {

      Swal.fire({
        title: '¡Error!',
        text: error.error.msg,
        icon: 'error',
        confirmButtonText: 'Ok'
      }); 

      return false;
    }

  }

}
