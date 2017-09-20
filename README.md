# MeetingTimer

This is a meeting timer that lets you time the overall meeting time as well as individual agenda item times. **You can [view a live demo](https://boykoc.github.io/meeting-timer/) of this project.**

This project is currently using anglular-cli version 1.4.2 and angular version 4.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

If running on a VM try `ng serve --host 0.0.0.0 --port 4200 --prod`. Using the `--prod` option will help compile Angular to catch any errors/warnings that may only appear when building a production version.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

This project currently uses `angular-cli-ghpages`.

After pushing changes to master, run `ng build --prod --base-href "https://boykoc.github.io/meeting-timer/"` then `angular-cli-ghpages`.
