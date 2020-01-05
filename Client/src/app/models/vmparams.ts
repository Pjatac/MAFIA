export class VMParams{
    period: number;
    servers: string[];
    constructor(period, servers) {
        this.period = period;
        this.servers = servers;
    }
}