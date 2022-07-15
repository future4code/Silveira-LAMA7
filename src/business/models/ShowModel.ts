export enum SHOW_DAY {
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY"
}

export interface ShowInputDTO {
    week_day: SHOW_DAY,
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
    getId() {
        return this.id
    }

    getWeekDay() {
        return this.week_day
    }

    getStartTime() {
        return this.start_time
    }

    getEndTime() {
        return this.end_time
    }

    getBandId() {
        return this.band_id
    }
}