import { Component, Input, trigger, state, style, transition, animate } from '@angular/core';

import { Timer } from './timer';

@Component({
    selector: 'my-timer',
    template: `
      <div class="timer">
        <div class="inner-container">
          <div class="timer-output">                                
            <span class="normal-text">{{timer.name}}</span> 
            <span *ngIf="timer.negative" [ngStyle]="{'color': color}" class="large-text">&minus;</span>         
            <span (click)="onSelect()" [ngStyle]="{'color': color, 'border-right': border}" class="large-text">{{timer.hhmmss | formatTime}}</span> 
            <span class="normal-text">time left</span>
          </div>
          <div class="visuallyHidden">
            <label for='total'>Total Time: </label>
            <input id="total" [(ngModel)]="timer.hhmmss" (keyup)="onKeyUp()" placeholder="total time" [myFocus]="giveFocus" (blur)="onBlur()">
          </div>
          <div [ngClass]="{'timer-bar': true, 'timer-bar-animation': showTimerAnimation, 'timer-paused': showTimerPaused}" 
          [style.webkitAnimationDuration.ms]="animationDuration"></div>
          <div class="actions">
            <button (click)="onStartStop()">Start/Stop</button>
            <button (click)="onReset()" [disabled]="timer.start">Reset</button>
            <label for="nevative-input" class="negative-checkbox">
              <input id="nagative-input" type="checkbox" [(ngModel)]="timer.negative" [disabled]="timer.start"> negative
            </label>          
          </div>
        </div>
      </div>
    `
})
export class TimerComponent {
  public giveFocus: boolean;
  public color: string;
  public border: string;
  public animationDuration: number;
  public showTimerPaused: boolean = true;
  public showTimerAnimation: boolean = false;

  private firstInterval: boolean;

  @Input()
  timer: Timer;

  onStartStop(): void {
    if (this.timer.start) {
      this.stop();
    } else {
      this.start();
    }
    this.timer.start = !this.timer.start;
    console.log(this.timer.negative)
  }

  onReset(): void {
    this.timer.hhmmss = this.timer.enteredTime;
    this.timer.negative = false;
    this.showTimerAnimation = !this.showTimerAnimation;
    this.timer.enteredTime = this.timer.hhmmss;
    this.timer.difference = this.convertToMilliseconds(this.timer.hhmmss);  
    this.setColor(this.timer.difference);
  }

  onSelect(): void {
    this.timer.start = false;
    clearInterval(this.timer.interval);
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
    // TODO: Think about adding a flag used to disable negative checkbox while a timer is in use. Clear the flag onKeyUp or Reset (when a user starts a new timer).
    this.timer.negative = false;
    this.timer.enteredTime = this.timer.hhmmss;
    this.timer.difference = this.convertToMilliseconds(this.timer.hhmmss);
  }

  start(): void {
    if (this.timer.negative) {
      this.animationDuration = 0;
    } else {      
      // find the original animation duration => TODO: move this to some form of initializer.                
      this.animationDuration = this.convertToMilliseconds(this.timer.enteredTime);
    }
    this.firstInterval = true;
    this.timer.interval = setInterval(() => this.updateTimer(), 100);
    this.showTimerPaused = !this.showTimerPaused;     
    if (!this.showTimerAnimation) {
      this.showTimerAnimation = !this.showTimerAnimation;
    }  
  }

  stop(): void {
    this.showTimerPaused = !this.showTimerPaused;
    clearInterval(this.timer.interval); 
    this.timer.difference = Math.abs(this.timer.endTime - window.performance.now());    
    console.log("STOP: " + this.timer.difference);    
  }

  updateTimer(): void {
    if (this.firstInterval) {
      console.log("NEGATIVE UPDATE: " + this.timer.negative);
      console.log("NEGATIVE UPDATE: " + this.timer.difference);
      if (this.timer.negative) {
        this.timer.endTime = window.performance.now() - this.timer.difference - 100; // subtract 100ms
        this.timer.difference = this.timer.difference < 0 ? this.timer.difference : -this.timer.difference;
      } else {
        this.timer.endTime = window.performance.now() + this.timer.difference - 100; // subtract 100ms
      }
      this.firstInterval = !this.firstInterval;
      console.log("first round")
    } else {   
      this.timer.difference = this.timer.endTime - window.performance.now();
    }
    this.setColor(this.timer.difference);
    console.log("BEFORE SET NEGATIVE: " + this.timer.difference);
    this.setNegative(this.timer.difference);
    // Convert to positive number using absolute value.
    this.timer.difference = Math.abs(this.timer.difference);
    this.sethmmss(this.timer.difference);
    console.log("hhmmss: " + this.timer.hhmmss);
    console.log("Loop: " + this.timer.difference);
  }

  private convertToMilliseconds(time: string): number {
    // Split out the string into hh mm ss.
    let millisecondsArray = (('0'.repeat(6) + time).slice(-6)).match(/.{1,2}/g);
    // Convert hh mm ss to milliseconds.
    let milliseconds = parseFloat(millisecondsArray[0]) * 60 * 60 * 1000 + parseFloat(millisecondsArray[1]) * 60 * 1000 + parseFloat(millisecondsArray[2]) * 1000;
    return milliseconds;
  }

  private sethmmss(diff: number): void {
    this.timer.hhmmss = ('0' + Math.floor(diff / (1000 * 60 * 60) % 24)).slice(-2).toString() + 
      ('0' + Math.floor(diff / (1000 * 60) % 60)).slice(-2).toString() +
      ('0' + Math.floor(diff / (1000) % 60)).slice(-2).toString();
  }

  private setNegative(diff: number): void {
    if (diff < 0) {
      this.timer.negative = true;
    } else {
      this.timer.negative = false;
    }
  }

  private setColor(diff: number): void {
    if (diff >= 0 && diff <= 30000) {
      this.color = 'orange';
    } else if (diff <= 0){
      this.color = 'red';
    } else {
      this.color = 'black';
    }
  }
}
