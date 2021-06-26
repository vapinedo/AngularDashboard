import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, pluck } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotaDevolucionService {

    private readonly baseUrl: string = environment.host;
    private readonly endPointDinamicos: string = 'GetDtObjTag';
    private readonly endPointPaquetesCursor: string = 'FncStoreProcedureTagDt';
    private readonly endPointPaquetesNumero: string = 'FncStoreProcedureTagDt32';

    constructor(
        private http: HttpClient
    ) { }

    public getMotivosDevolucion(): Observable<any> {
        const body = {
            "Tag": "SLTMOTIVOS",
            "Parametros": "#0",
            "Separador": "#"
        };
        return this.http.post(`${this.baseUrl}/${this.endPointDinamicos}`, body)
            .pipe(pluck('Value'));
    }

    public getMediosDevolucion(sticker: string): Observable<any> {
        const body = {
            "Tag": "GETQUIEMED",
            "Procedimiento": "DEVOLUCIONES.PKG_NOTA_DEV_DIGITAL.PRC_OBTENER_MEDIOS_POR_NOTA",
            "Parametros": [
                {
                    "Tipo": "s",
                    "IntValor": 0,
                    "DouValor": 0,
                    "DateValor": "",
                    "Entrada": true,
                    "Nombre": "P_STICKER",
                    "StringValor": `#${sticker}`
                },
                {
                    "Tipo": "c",
                    "IntValor": 0,
                    "DouValor": 0,
                    "DateValor": "",
                    "Entrada": false,
                    "Nombre": "P_MEDIOS",
                    "StringValor": "string"
                }
            ]
        };
        return this.http.post(`${this.baseUrl}/${this.endPointPaquetesCursor}`, body)
            .pipe(pluck('Value'));
    }

}