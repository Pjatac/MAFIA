export interface WSResponse{
    code: number;
    time: number;
}

export class TimeResponse{
    name: string;
    responses: WSResponse[];
}