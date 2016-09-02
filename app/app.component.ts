import { Component } from '@angular/core';

import { MdInputModule } from '@angular2-material/input';
import { MdCoreModule } from '@angular2-material/core';

import { Timer } from './timer';

@Component({
  selector: 'my-app',
  template: `
	<h1>{{title}}</h1>	
	<my-timer [timer]="agendaItemTimer" class="agendaItemTimer"></my-timer>
	<my-timer [timer]="overallMeetingTimer" class="overallMeetingTimer"></my-timer>
    `
})
export class AppComponent {
	title = "Meeting Timer";
	overallMeetingTimer: Timer = {
		totalTime: '1000',
		hours: 0,
		minutes: 0,
		seconds: 0, 
		enteredTime: '1000', 
		timeInMilliseconds: '',
		start: false, 
		interval: '',
		count_down_to: null, 
		name: 'Overall Meeting'
	};
	agendaItemTimer: Timer = {
		totalTime: '1000',
		hours: 0,
		minutes: 0,
		seconds: 0, 
		enteredTime: '1000', 
		timeInMilliseconds: '',
		start: false, 
		interval: '',
		count_down_to: null, 
		name: 'Current Agenda Item'
	};
}