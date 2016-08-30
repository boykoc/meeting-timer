import { Component } from '@angular/core';

export class Timer {
	totalTime: string;
	hours: number;
	minutes: number;
	seconds: number;
}

@Component({
    selector: 'my-app',
    template: `
    	<h1>{{title}}</h1>
    	<div>
    		You have <span>{{timer.totalTime}}</span> left.
    	</div>
    	<div>
    		<label for='total'>Total Time: </label>
    		<input id="total" [(ngModel)]="timer.totalTime" placeholder="total time">
    	</div>
    	<button>Start/Stop</button>
    	<button>Reset</button>
    	`
})
export class AppComponent {
	title = "Meeting Timer";
	timer: Timer = {
		totalTime: '00:00:00',
		hours: 0,
		minutes: 0,
		seconds: 0
	};
}
