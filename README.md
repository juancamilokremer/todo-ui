# TodoUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## App tour

To-Do application allows the user to create an indeterminate number of to-do and add items to them, the application starts with a list of To-Do

<img src="images\todo_list_empty.PNG">

If there are not To-Do created yet the application shows zero state information and options to create a To-Do

<img src="images\create_todo.PNG">

The To-Do created will appear in the application with the information of the collapsed elements, when clicking on the header the elements of the task will be displayed

<img src="images\todo_list.PNG">

To create a new item, you can click on the "Add Item" option where the application will ask for the name of the new item.

<img src="images\Add_item.PNG">

In the header of each Task in the right corner the user can find the ellipsis icon with the options to edit (modify the task name) and delete a pending task and the same functionalities in the configuration icon on the right side of each Article

<img src="images\edit_and_delete_todo.png">

<img src="images\edit_and_delete_item.png">

In the delete option, the application will ask first confirmation of the action
<img src="images\confimation_delete_item.PNG">