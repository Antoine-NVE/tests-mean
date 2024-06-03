import { User } from './User';

export interface Post {
    _id: string;
    text: string;
    createdAt: Date;
    user: User;
}
