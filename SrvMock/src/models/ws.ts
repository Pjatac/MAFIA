export interface WSResponse{
    code: number;
    time: number;
}

export interface API{
    name: string;
    errs: Date[];
}

export class WS{
    name: string;
    responses: WSResponse[];
    apis: API[];
}