import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MdButtonModule } from '@angular2-material/button';
import { MdCoreModule } from '@angular2-material/core';
import { MdInputModule } from '@angular2-material/input';

import { AppComponent } from './app.component';
import { FormatTimePipe } from './format-time.pipe';
import { TimerComponent } from './timer.component';
import { FocusDirective } from './focus.directive';

@NgModule({
    imports: [ 
    	BrowserModule, 
    	FormsModule,
    	MdButtonModule,
    	MdCoreModule,
    	MdInputModule
    ],
    declarations: [ 
    	AppComponent, 
    	FormatTimePipe,
    	TimerComponent,
    	FocusDirective        
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
