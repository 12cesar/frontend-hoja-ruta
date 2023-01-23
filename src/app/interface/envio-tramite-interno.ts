export interface EnvioTramiteInterno{
    cantidad:string,
    codigo?:string,
    id_destino:EnvioDestino[]
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