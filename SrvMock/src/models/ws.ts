export interface WSResponse{
    code: number;
    time: number;
}

export class WS{
    name: string;
    responses: WSResponse[];
}