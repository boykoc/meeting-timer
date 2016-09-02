import { Component, Input } from '@angular/core';
import { MdButtonModule } from '@angular2-material/button';
import { Timer } from './timer';

@Component({
    selector: 'my-timer',
    template: `
    	<div class="timer">
    		<div class="inner-container">
		    	<div>
		    		<span class="normal-text">{{timer.name}}</span> 
		    		<span (click)="onSelect()" [ngStyle]="{'color': color, 'border-right': border}" class="large-text">{{timer.totalTime | formatTime}}</span> 
		    		<span class="normal-text">time left</span>
		    	</div>
		    	<div class="visuallyHidden">
		    		<label for='total'>Total Time: </label>
		    		<input id="total" [(ngModel)]="timer.totalTime" (keyup)="onKeyUp()" placeholder="total time" [myFocus]="giveFocus" (blur)="onBlur()">
		    	</div>
		    	<button (click)="onStartStop()">Start/Stop</button>
		    	<button (click)="onReset()">Reset</button>
		    </div>
	    </div>
    	`
})
export class TimerComponent {
	private giveFocus: boolean;
	private color: string;
	private border: string;

	@Input()
	timer: Timer;
	// timer: Timer = {
	// 	totalTime: '1000',
	// 	hours: 0,
	// 	minutes: 0,
	// 	seconds: 0, 
	// 	enteredTime: '1000', 
	// 	timeInMilliseconds: '',
	// 	start: false, 
	// 	interval: '',
	// 	count_down_to: null
	// };

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
		this.giveFocus = true;	
		this.color = 'lightgray';
		this.border = '1px solid black';
	}

	onBlur(): void {
		this.giveFocus = false;
		this.color = 'black';
		this.border = 'none';
	}

	onKeyUp(): void {
		this.timer.enteredTime = this.timer.totalTime;
	}

	convertToMilliseconds(): void {
		// Split out the string into hh mm ss.
		let millisecondsArray = (('0'.repeat(6) + this.timer.totalTime).slice(-6)).match(/.{1,2}/g);
		// Convert hh mm ss to milliseconds.
		let milliseconds = parseInt(millisecondsArray[0]) * 60 * 60 * 1000 + parseInt(millisecondsArray[1]) * 60 * 1000 + parseInt(millisecondsArray[2]) * 1000;
		this.timer.timeInMilliseconds = milliseconds.toString();
	}

	updateTimer(): void {
		let now = new Date();
		let difference: number = Math.round((this.timer.count_down_to.valueOf() - now.valueOf()) / 1000) * 1000;
		this.timer.timeInMilliseconds = difference.toString();
		this.timer.totalTime = ('0' + Math.floor(difference / (1000 * 60 * 60) % 24)).slice(-2).toString() + 
			('0' + Math.floor(difference / (1000 * 60) % 60)).slice(-2).toString() +
			('0' + Math.floor(difference / (1000) % 60)).slice(-2).toString();
	}
}
 