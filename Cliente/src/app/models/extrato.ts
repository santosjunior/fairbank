import { Deposito } from './deposito';
import { Transferencia } from './tranferencia';
import { Saque } from './saque';
import { User } from './user';

export class Extrato {
    usuario?: User;
    saque?: [Saque];
    transferencia?: [Transferencia];
    tfRecebida?: [Transferencia];
    deposito?: [Deposito];
}