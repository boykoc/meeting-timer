export class Timer {
	hhmmss: string; // Time in ui format hhmmss
	enteredTime: string; // Original time entered (only value not updated when running)
	endTime: any; // Time counting down to (now + difference)
	difference: number; // Amount of time from now to endTime
	start: boolean; // State flag
	interval: any; // JS interval
	name: string; // Timer name
  negative: boolean; // Negative state flag
}
