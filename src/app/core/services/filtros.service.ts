import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tienda } from '../interfaces/tienda.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class FiltrosService {

    private readonly baseUrl: string = environment.host;
    private readonly endPointDinamicos: string = 'GetDtObjTag';
    private readonly endPointPaquetesCursor: string = 'FncStoreProcedureTagDt';
    private readonly endPointPaquetesNumero: string = 'FncStoreProcedureTagDt32';

    constructor(
        private http: HttpClient
    ) {}

    getTiendas(): Observable<Tienda[]> {
        const body = {
            "Separador": "#",
            "Parametros": "#",
            "Tag": "LOKBODTDA"
        };
        return this.http.post(`${this.baseUrl}/${this.endPointDinamicos}`, body)
            .pipe(
                pluck('Value')
            );
    }
}