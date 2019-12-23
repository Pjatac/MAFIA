import { VM } from './virtualmashine';

export class SRV{
    name: String;
    vms: VM[];
    constructor(name, vms){
        this.name = name;
        this.vms = vms;
    }
}