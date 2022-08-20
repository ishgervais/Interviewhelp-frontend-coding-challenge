export type UserRecord = {
    id: string;
    createdTime?: string;
    fields: {
        Name: string,
        avatar?: string,
        occcupation: string
    }
    offset: string,
}