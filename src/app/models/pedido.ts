import { ItenPedido } from "./itenPedido";

export interface Pedido{
    id?:             any;
    data_registro:   string;
    valor_total:     number|string;
    cliente_fk:      number;
    status:          string;
    nomeCliente:     string;
    itensPedido?: ItenPedido[];
}
