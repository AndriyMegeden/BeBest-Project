export type NotificationType = 'notProgressToday';

export interface Notification{
    type: NotificationType;
    message: string;
}