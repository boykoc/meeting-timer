import { Component } from '@angular/core';

import { Timer } from './timer';

@Component({
  selector: 'my-app',
  template: `
		<h1>{{title}}</h1>	
		<div class="container">
			<my-timer [timer]="agendaItemTimer" class="agendaItemTimer"></my-timer>
			<my-timer [timer]="overallMeetingTimer" class="overallMeetingTimer"></my-timer>
		</div>
  `
})
export class AppComponent {
	title = "Meeting Timer";
	overallMeetingTimer: Timer = {
		hhmmss: '100', 
		enteredTime: '100', 
		endTime: 0,
		difference: 60000,
		start: false, 
		interval: '',
		name: 'Overall Meeting',
    negative: false
	};
	agendaItemTimer: Timer = {
		hhmmss: '100',
		enteredTime: '100',
		endTime: 0,
		difference: 60000,
		start: false, 
		interval: '',
		name: 'Current Agenda Item',
    negative: false
	};
}
