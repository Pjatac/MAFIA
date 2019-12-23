import { VMLoad } from './vmload';

export class VM{
    name: string;
    data: VMLoad[];
    constructor(name, data){
        this.name = name;
        this.data = data;
    }
}