export interface WSResponse{
    code: number;
    time: number;
}

export interface API{
    name: string;
    errors: Date[];
}

export class WS{
    name: string;
    responses: WSResponse[];
    apis: API[];
}