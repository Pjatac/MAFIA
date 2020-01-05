export class TFParams{
    period: Number;
    top: Number;
    date: Date;
    wsList: String[];
    apiList: String[];
    constructor(period, top, date, wsList, apiList) {
        this.period = period;
        this.top = top;
        this.date = date;
        this.wsList = wsList;
        this.apiList = apiList;
    }
}