# RxJs In Practice

- Learn numerous RxJs Operators, learn all RxJs and Reactive Programming core concepts via Practical Examples
- This course is a complete practical guide for the RxJs library (Reactive Extensions for Javascript).
- The goal here is not to cover every single operator, but instead to choose an extended subset that contains the most commonly used operators, and provide practical examples for each.
- Another goal of the course is to show how RxJs is meant to be used for building programs using Reactive Design as opposed to an imperative programming style.

## Introduction to RxJs

### RxJs In Practice Course Helicopter View

- Baseline concepts
    - Streams
    - Observables
    - Subjects
    - Stores

### IMPORTANT - Recommended Software Versions

- Please note that this version of the course is optimised for **Node 18**
- Please use this version of node, which is compatible with the package-lock.json available in the repository. This will avoid any semantic versioning issues, and ensure you a smooth installation and course taking experience.

### The Typescript Jump start Ebook

- This course will be in the Typescript language
- If not familiar there is an E-Book aimed at getting you started quickly with the language
  - [The Typescript Jump start Ebook](Typescript_Jumpstart_Book_Udemy.pdf)

### Environment Setup - Get the lessons Code Up and Running

- Install Node.js `winget install -e --id OpenJS.NodeJS`
- Install Git `winget install -e --id Git.Git`
- Install Weebstorm (using Toolbox) `winget install -e --id JetBrains.Toolbox`
- Course code repository : [The RxJs In Practice Course GitHub](https://github.com/angular-university/rxjs-course)
- Initialize the project: `npm install npm@latest -g`
- Start the project:
  ```
  npm run server
  npm start
  ```

### Understanding RxJx - What are Streams?

- Maybe the most fundamental notion in RXJS : Stream of Values
- Everything is asynchronous events
- Examples
  - Every click will be a stream of values containing the click event
    - Log the whole document from a stream of clicks anywhere on the page
    - Subscribe to the click event and print the event in the console
  - Java script intervals
    - Periodically perform a certain task in the runtime
    - Emits a new value each time
  - These a re now two independent streams of values
  - setTimeout is also a special type of stream commonly used by most applications
    - It emits only one value and then completes


### What is RxJs? What Problem Does it Solve?
### What is an RxJs Observable? A Simple Explanation
### 3 Core RxJs Concepts - Errors, Completion and Subscriptions
### Learn How Observables Work Under the Hood. Build Your Own HTTP Observable
## Essential RxJs Operators + Reactive Design
## RxJs Error Handling
## Building a RxJs Custom Operator
## RxJs Subjects and the Store Pattern
## Conclusion
### Bonus Lecture
### RxJs In Practice Course Conclusion and Key Takeaways
