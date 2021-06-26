import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Novedad } from '../interfaces/novedad.interface';
import { environment } from 'src/environments/environment';
import { NovedadCrear } from '../interfaces/novedad-crear.interface';
import { FiltroNovedad } from '../interfaces/filtro-novedad.interface';
import { RetractoCrear } from '@core/interfaces/retracto-crear.interface';
@Injectable()
export class NovedadesService {

    // Emit event when novedades get new data from backend
    public onNovedadesChange: EventEmitter<Novedad[]> = new EventEmitter<Novedad[]>();

    private readonly pathReprogramaciones: string = environment.reprogramaciones;
    private readonly baseUrl: string = environment.host;
    private readonly endPointDinamicos: string = 'GetDtObjTag';
    private readonly endPointPaquetesCursor: string = 'FncStoreProcedureTagDt';
    private readonly endPointPaquetesNumero: string = 'FncStoreProcedureTagDt32';

    constructor(
        private http: HttpClient
    ) {}

    getUsuarioNotaPedidoBySticker(sticker: string): Observable<any> {
        const dinamico = 'SLTENCNOVE';
        const body = {
            "Tag": `${dinamico}`,
            "Separador": "#",
            "Parametros": `#${sticker}`
        };
        return this.http.post(`${this.baseUrl}/${this.endPointDinamicos}`, body)
            .pipe(pluck('Value'));
    }

    getSkusBySticker(sticker: string): Observable<any> {
        const dinamico = 'CESKUDASHB';
        const body = {
            "Tag": `${dinamico}`,
            "Separador": "#",
            "Parametros": `#${sticker}`
        };
        return this.http.post(`${this.baseUrl}/${this.endPointDinamicos}`, body)
            .pipe(pluck('Value'));
    }

    getDinamico(): Observable<any> {
        const dinamico = 'TIPNOVCE';
        const body = {
            "Tag": `${dinamico}`,
            "Separador": "#",
            "Parametros": `#`
        };
        return this.http.post(`${this.baseUrl}/${this.endPointDinamicos}`, body);
    }

    createReprogramacion(novedad: NovedadCrear): Observable<any> {
        const body = {
            "Tag": "SETCANOVED",
            "Procedimiento": "PKG_SLT_CONTROL_ENTREGAS.PRC_SET_CON_ENT_REP",
            "Parametros": [
                {
                    "Tipo": "s",
                    "IntValor": 0,
                    "DouValor": 0,
                    "DateValor": "",
                    "Entrada": true,
                    "StringValor": `#${novedad.sticker}#${novedad.idCausal}#${novedad.idNovedad}#${novedad.nombreUsuario}`,
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
        };
        return this.http.post(`${this.baseUrl}/${this.endPointPaquetesCursor}`, body)
            .pipe(pluck('Value'));
    }

    createRetracto(retracto: RetractoCrear): Observable<any> {
        const info = retracto.infoGeneral;
        const usuario = `${sessionStorage.getItem("usuario")}`;
        const body = {
            "Tag": "VALNOVCE",
            "Procedimiento": "pkg_slt_control_entregas.prc_guardar_info",
            "Parametros": [
                {
                    "Tipo": "s",
                    "IntValor": 0,
                    "DouValor": 0,
                    "DateValor": "",
                    "Entrada": true,
                    "StringValor": `${retracto.sticker}`,
                    "Nombre": "P_STICKER_O_NOTA"
                },
                {
                    "Tipo": "s",
                    "IntValor": 0,
                    "DouValor": 0,
                    "DateValor": "",
                    "Entrada": true,
                    "StringValor": `${retracto.xml}`,
                    "Nombre": "P_RETRACTO"
                },
                {
                    "Tipo": "s",
                    "IntValor": 0,
                    "DouValor": 0,
                    "DateValor": "",
                    "Entrada": true,
                    "StringValor": "VAL",
                    "Nombre": "P_TIPO_CONSULTA"
                },
                {
                    "Tipo": "s",
                    "IntValor": 0,
                    "DouValor": 0,
                    "DateValor": "",
                    "Entrada": true,
                    "StringValor": `${retracto.idTipoNovedad}`,
                    "Nombre": "P_TIP_NOV"
                },
                {
                    "Tipo": "s",
                    "IntValor": 0,
                    "DouValor": 0,
                    "DateValor": "",
                    "Entrada": true,
                    "StringValor": `#${info.email}#${info.telefono}#${info.medioDevolucion}#${info.devolucionAcordada}#${info.usuarioQuienDevuelve}`,
                    "Nombre": "P_PARAMETROS"
                },
                {
                    "Tipo": "s",
                    "IntValor": 0,
                    "DouValor": 0,
                    "DateValor": "",
                    "Entrada": true,
                    "StringValor": `${usuario}`,
                    "Nombre": "P_USUARIO"
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
        };
        return this.http.post(`${this.baseUrl}/${this.endPointPaquetesCursor}`, body)
            .pipe(pluck('Value'));
    }

    getTodas(IDestadoNP: number): Observable<any> {
        const dinamico = 'TIPNOVCE';
        const body = {
            "Tag": `${dinamico}`,
            "Separador": "#",
            "Parametros": `#${IDestadoNP}`
        };
        return this.http.post(`${this.baseUrl}/${this.endPointDinamicos}`, body)
            .pipe(pluck('Value'));
    }

    getCausales(): Observable<any> {
        const body = {
            "Tag": "-",
            "Procedimiento": "PKG_REPROGRAMACION.PRC_GET_CAUSALES",
            "Parametros": [
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

    getEstados(): Observable<any> {
        const dinamico = 'SELECESTCE';
        const body = {
            "Tag": `${dinamico}`,
            "Separador": "#",
            "Parametros": "#"
        };
        return this.http.post(`${this.baseUrl}/${this.endPointDinamicos}`, body)
            .pipe(pluck('Value'));
    }

    getAll(): Observable<any> {
        const tienda =  -1;
        const estado = -1;
        const fechaFin = '01/05/2021';
        const fechaInicio = '01/01/2020';
        const token = '?token=' + sessionStorage.getItem('usuario');
        const dinamico = 'CANTINOVCE';
        const pathReprogramaciones = this.pathReprogramaciones;

        const body = {
            "Tag": `${dinamico}`,
            "Separador": "#",
            "Parametros": `#${tienda}#${estado}#${fechaInicio}#${fechaFin}`
        };
        return this.http.post(`${this.baseUrl}/${this.endPointDinamicos}`, body)
            .pipe(
                pluck('Value'),
                map((data: any) => {
                    data.forEach(function(item:any) {
                        item.PATH = `${pathReprogramaciones}${token}`;
                        item.ICONO = 'event';
                    });
                    this.onNovedadesChange.emit(data);
                    return data;
                })
            );
    }

    getByFilter(filter: FiltroNovedad): Observable<any> {
        const tienda = filter.tienda ? filter.tienda : -1;
        const estado = filter.estado ? filter.tienda : -1;
        const fechaFin = filter.fechaFin ? filter.fechaFin : '01/05/2021';
        const fechaInicio = filter.fechaInicio ? filter.fechaInicio : '01/01/2020';

        const token = '?token=PERE07';
        const dinamico = 'CANTINOVCE';
        const pathReprogramaciones = this.pathReprogramaciones;

        const body = {
            "Tag": `${dinamico}`,
            "Separador": "#",
            "Parametros": `#${tienda}#${estado}#${fechaInicio}#${fechaFin}`
        };
        return this.http.post(`${this.baseUrl}/${this.endPointDinamicos}`, body)
            .pipe(
                pluck('Value'),
                map((data: any) => {
                    data.forEach(function(item:any) {
                        item.PATH = `${pathReprogramaciones}${token}`;
                        item.ICONO = 'event';
                    });
                    this.onNovedadesChange.emit(data);
                    return data;
                })
            );
    }

    getAccionesByIdNovedades(idNovedad: number): Observable<any> {
        const dinamico = 'SELACNOVCE';
        const body = {
            "Tag": `${dinamico}`,
            "Separador": "#",
            "Parametros": `#${idNovedad}`
        };
        return this.http.post(`${this.baseUrl}/${this.endPointDinamicos}`, body)
            .pipe(pluck('Value'));
    }
}