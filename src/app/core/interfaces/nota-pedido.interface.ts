export interface NotaPedido {
  id?: number;
  sku?: string;
  fecha?: string;
  estado?: string;
  nombres?: string;
  sticker?: string;
  cantidad?: number;
  telefono?: string;
  apellidos?: string;
  descripcion?: string;
  tipoEntrega?: string;
  transportadora?: string;

  // nuevas propiedades 
  FLUJO?: string;
  CIUDAD?: string;
  STICKER?: string;
  FECHA_CREA?: string;
  NOM_ALM_ENT?: string;
  NOTA_PEDIDO?: string;
  FECHA_ENTREGA?: string;
  ID_EMP_TRANSP?: string;
  ID_ESTADO_SAPS?: number;
  ID_TIPO_ENTREGA?: number;
  DESC_EMP_TRANSP?: string;
  ID_TIPO_NOVEDAD?: string;
  DESC_ESTADO_SAPS?: string;
  DESC_TIPO_NOVEDAD?: string;
  DESC_TIPO_ENTREGA?: string;
  ID_ESTADO_PROCESO?: string;
  DESC_ESTADO_PROCESO?: string;

}
