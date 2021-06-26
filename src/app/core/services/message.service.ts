import { Injectable } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';

@Injectable()
export class MessageService {

  constructor(private toastrSvc: ToastrService) { }

  success(): ActiveToast<any> {
    const message = 'Reigstro creado exitosamente';
    return this.toastrSvc.success(message);
  }

  error(message: string): ActiveToast<any> {
    return this.toastrSvc.error(message);
  }
}