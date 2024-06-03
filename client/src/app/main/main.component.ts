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
        { _id: '2', text: 'Un deuxième post', createdAt: new Date(2024, 5, 3, 12, 4, 45), user: { _id: '1', pseudo: 'Georges' } },
    ];
}
