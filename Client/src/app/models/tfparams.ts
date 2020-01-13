export class TFParams{
    period: {start: Number, end: Number};
    top: Number;
    date: Date;
    apiList: String[];
    constructor(period, top, date, apiList) {
        this.period = period;
        this.top = top;
        this.date = date;
        this.apiList = apiList;
    }
}