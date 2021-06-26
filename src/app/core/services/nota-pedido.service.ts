import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class NotaPedidoService {

    /*
        Array con id de estados de notas pedidos
        que indican que no se puede crear una novedad
        cuando la nota tiene alguno de estos estados (id)
    */
    private readonly idEstadosCompletados = [15, 31, 39, 41];

    private readonly baseUrl: string = environment.host;
    private readonly endPointDinamicos: string = 'GetDtObjTag';
    private readonly endPointPaquetesCursor: string = 'FncStoreProcedureTagDt';
    private readonly endPointPaquetesNumero: string = 'FncStoreProcedureTagDt32';

    constructor(
        private http: HttpClient
    ) {}

    checkNotaPedidoIsComplete(idEstadoNota: number): boolean {
        return this.idEstadosCompletados.some(item => item === idEstadoNota);
    }

    getByNP(notaPedido: string): Observable<any> {
        const body = {
            "Tag": "GETNPCOENT",
            "Procedimiento": "PKG_SLT_CONTROL_ENTREGAS.PRC_CE_ACT_CRE",
            "Parametros": [
                {
                    "Tipo": "s",
                    "IntValor": 0,
                    "DouValor": 0,
                    "DateValor": "",
                    "Entrada": true,
                    "StringValor": `${notaPedido}`,
                    "Nombre": "P_STICKER_O_NOTA"
                },
                {
                    "Tipo": "s",
                    "IntValor": 0,
                    "DouValor": 0,
                    "DateValor": "",
                    "Entrada": true,
                    "StringValor": "GET",
                    "Nombre": "P_TIPO_CONSULTA"
                },
                {
                    "Tipo": "s",
                    "IntValor": 0,
                    "DouValor": 0,
                    "DateValor": "",
                    "Entrada": true,
                    "StringValor": "#",
                    "Nombre": "P_PARAMETROS"
                },
                {
                    "Tipo": "c",
                    "IntValor": 0,
                    "DouValor": 0,
                    "DateValor": "",
                    "Entrada": false,
                    "StringValor": "",
                    "Nombre": "P_SALIDA"
                }
            ]
        }
        return this.http.post(`${this.baseUrl}/${this.endPointPaquetesCursor}`, body)
            .pipe(pluck('Value'));
    }
}