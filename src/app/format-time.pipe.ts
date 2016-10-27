import { Pipe, PipeTransform } from '@angular/core';
/*
 * Format a 6 digit string into hh mm ss format.
 * Takes a string value.
 * Usage:
 *   value | formatTime
 * Example:
 *   {{ '001000' | formatTime }}
 *   formats to: 00h 10m 00s
*/

@Pipe({name: 'formatTime'})
export class FormatTimePipe implements PipeTransform {
	transform(value: string): string {
		let matchesArray = (('0'.repeat(6) + value).slice(-6)).match(/(.{2})/g);
		return matchesArray[0] + 'h ' + matchesArray[1] + 'm ' + matchesArray[2] + 's';	
	}
}
