import { Component } from '@angular/core';

export class Timer {
	totalTime: string;
	hours: number;
	minutes: number;
	seconds: number;
	enteredTime: string;
}

@Component({
    selector: 'my-app',
    template: `
    	<h1>{{title}}</h1>
    	<div>
    		You have <span (click)="onSelect()">{{timer.totalTime}}</span> left.
    	</div>
    	<div>
    		<label for='total'>Total Time: </label>
    		<input id="total" [(ngModel)]="timer.totalTime" (keyup)="onKeyUp()" placeholder="total time">
    	</div>
    	<button (click)="onStartStop()">Start/Stop</button>
    	<button (click)="onReset()">Reset</button>
    	`

})
export class AppComponent {
	title = "Meeting Timer";
	timer: Timer = {
		totalTime: '00:00:00',
		hours: 0,
		minutes: 0,
		seconds: 0, 
		enteredTime: ''
	};

	onStartStop(): void {
		// Stub out for now
		// TODO: implement
	}

	onReset(): void {
		this.timer.totalTime = this.timer.enteredTime;
	}

	onSelect(): void {
		// Stub out for now
		// TODO: implement		
	}

	onKeyUp(): void {
		this.timer.enteredTime = this.timer.totalTime;
	}

}
