export enum SHOW_DAY {
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY"
}

export interface ShowInputDTO {
    week_day: string,
    start_time: number,
    end_time: number,
    band_id: string
}

export class Show {
    constructor(
        private id: string,
        private week_day: SHOW_DAY,
        private start_time: number,
        private end_time: number,
        private band_id: string
    ) { }
}