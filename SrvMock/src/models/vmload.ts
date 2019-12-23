export class VMLoad{
    cpuUsage: number;
    memUsage: number;
    constructor(cpuUsage, memUsage) {
        this.cpuUsage = cpuUsage;
        this.memUsage = memUsage;
    }
}