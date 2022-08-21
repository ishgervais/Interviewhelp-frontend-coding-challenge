export type UserRecord = {
    id: string;
    createdTime?: string;
    fields: {
        Id: number;
        Name: string;
        avatar?: string;
        occupation: string
    }
}

export type UserRecords = {
    records: UserRecord[];
    offset: string;
}

export type FormatedUserRecord = {
    Id: number;
    Name: string;
    avatar?: string;
    occupation: string
    totalImpresions: number;
    totalConversions: number;
    totalRevenue: number;
    chartSummary: string;
    categories: string[];
    series: number[];
    conversionsMap: { [key: string]: number };
}

export type UserLog = {
    user_id: number;
    time: string;
    type: string;
    revenue: number;
}

export type Slide = { key: number, content: string, offset?: string }