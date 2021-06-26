interface infoGeneral {
    email: string;
    telefono: string;
    medioDevolucion?: string;
    devolucionAcordada: string;
    usuarioQuienDevuelve: string;
}

export interface RetractoCrear {
    xml: any;
    sticker: string;
    idTipoNovedad: number;
    infoGeneral: infoGeneral;
}