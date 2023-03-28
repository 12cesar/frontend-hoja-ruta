export interface EnvioTramiteInterno{
    cantidad:string,
    codigo?:string,
    id_destino:EnvioDestino[]
}

export interface EnvioTramiteInternoDos{
    cantidad:string,
    id?:number,
    id_destino:EnvioDestino[],
    accion:string;
    codigo:string;
}

export interface EnvioTramiteExterno{
    cantidad:string,
    codigo?:string,
    id_destino:EnvioDestino[]
}
export interface EnvioDestino{
    id:number,
    nombre:string
}
