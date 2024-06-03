import { Component } from '@angular/core';
import { Post } from '../../models/Post';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
})
export class MainComponent {
    public now: Date = new Date();
    public posts: Post[] = [
        { _id: '1', text: 'Un premier post', createdAt: new Date(2024, 5, 2, 16, 35, 4), user: { _id: '1', pseudo: 'Antoine' } },
        { _id: '2', text: 'Un deuxième post', createdAt: new Date(2023, 9, 3, 12, 4, 45), user: { _id: '2', pseudo: 'Georges' } },
        { _id: '3', text: 'Un troisième post', createdAt: new Date(2019, 3, 3, 12, 4, 45), user: { _id: '2', pseudo: 'Georges' } },
        { _id: '4', text: 'Un quatrième post', createdAt: new Date(2024, 5, 2, 12, 4, 45), user: { _id: '2', pseudo: 'Georges' } },
        { _id: '5', text: 'Un cinquième post', createdAt: new Date(2024, 5, 3, 12, 4, 45), user: { _id: '2', pseudo: 'Georges' } },
    ];

    public getElapsedTime(post: Post): string {
        const seconds = Math.floor((new Date().getTime() - post.createdAt.getTime()) / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (seconds < 60) {
            return `${seconds} seconde(s)`;
        }
        if (minutes < 60) {
            return `${minutes} minute(s)`;
        }
        if (hours < 24) {
            return `${hours} heure(s)`;
        }
        if (days < 7) {
            return `${days} jour(s)`;
        }
        if (weeks < 4) {
            return `${weeks} semaine(s)`;
        }
        if (months < 12) {
            return `${months} mois`;
        }
        return `${years} an(s)`;
    }
}
