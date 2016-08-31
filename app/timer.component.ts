import { Component, Input } from '@angular/core';

import { Timer } from './timer';

@Component({
    selector: 'my-timer',
    template: `
    	<div>
	    	<div>
	    		You have <span (click)="onSelect()">{{timer.totalTime | formatTime}}</span> left.
	    	</div>
	    	<div>
	    		<label for='total'>Total Time: </label>
	    		<input id="total" [(ngModel)]="timer.totalTime" (keyup)="onKeyUp()" placeholder="total time">
	    	</div>
	    	<button (click)="onStartStop()">Start/Stop</button>
	    	<button (click)="onReset()">Reset</button>
	    </div>
    	`
})
export class TimerComponent {
	@Input()
	timer: Timer;

	onStartStop(): void {
		if (this.timer.start) {
			clearInterval(this.timer.interval);
		} else {
			// get time
			// convert to milliseconds
			// convert to date (date + milliseconds) as count_to_date
			// find difference from count_to_date to current date (count_to_date - current_date) each second
			// update totalTime
			this.convertToMilliseconds();
			//this.timer.count_down_to = new Date(new Date().getMilliseconds() + this.timer.timeInMilliseconds);
			let d = new Date();
			this.timer.count_down_to = d.setTime(d.getTime() + parseInt(this.timer.timeInMilliseconds));
			this.timer.interval = setInterval(() => this.updateTimer(), 1000);
		}
		this.timer.start = !this.timer.start;		
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

	convertToMilliseconds(): void {
		// Split out the string into hh mm ss.
		let millisecondsArray = (('0'.repeat(6) + this.timer.totalTime).slice(-6)).match(/.{1,2}/g);
		// Convert hh mm ss to milliseconds.
		let milliseconds = parseInt(millisecondsArray[0]) * 60 * 60 * 1000 + parseInt(millisecondsArray[1]) * 60 * 1000 + parseInt(millisecondsArray[2]) * 1000;
		console.log(milliseconds);
		this.timer.timeInMilliseconds = milliseconds.toString();
	}

	updateTimer(): void {
		this.convertToMilliseconds();
		let now = new Date();
		let difference = this.timer.count_down_to.valueOf() - now.valueOf();
		this.timer.timeInMilliseconds = difference.toString();
		this.timer.totalTime = ('0' + Math.floor(parseInt(this.timer.timeInMilliseconds) / (1000 * 60 * 60) % 24)).slice(-2).toString() + 
			('0' + Math.floor(parseInt(this.timer.timeInMilliseconds) / (1000 * 60) % 60)).slice(-2).toString() +
			('0' + Math.floor(parseInt(this.timer.timeInMilliseconds) / (1000) % 60)).slice(-2).toString();
	}
}
 