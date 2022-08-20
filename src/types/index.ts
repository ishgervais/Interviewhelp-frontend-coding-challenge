export type UserRecord = {
    id: string;
    createdTime?: string;
    fields: {
        Name: string,
        avatar?: string,
        occupation: string
    }
    offset: string,
}

export type FormatedUserRecord = {
    id: string;
    Name: string,
    avatar?: string,
    occupation: string
    totalImpresions: number,
    totalConversions: number,
    totalRevenue: number,
    chartSummary: string,
    categories: string[],
    series: number[]
}

export type UserLog = {
    user_id: string;
    time: string;
    type: string,
    revenue: number,
}