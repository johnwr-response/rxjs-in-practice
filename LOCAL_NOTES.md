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
- Install Webstorm (using Toolbox) `winget install -e --id JetBrains.Toolbox`
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

- What is RxJs
- When should we use it
- Why, what benefits does it give us

- Avoid "Call back hell"
- We want to combine multiple types of streams caused by
  - user interactions
  - backend requests
  - timeouts
  - intervals
- We want to combine all such synchronous events in order to produce a final result 
- The RxJs (Reactive extensions for Javascript) library is a better way to combine streams of values in a maintainable way
- It is an extension to standard javascript
- The key notion being the ***Observable***

### What is an RxJs Observable? A Simple Explanation

- A definition, a declaration of the stream, not an instance of the stream
- An observable will only become a stream if we subscribe to it

### 3 Core RxJs Concepts - Errors, Completion and Subscriptions

- The guarantees that are given by the Observable contract which all these streams follows are:
  - The observable will continue emitting its values until either error or finish event is emitted.
  - After **either** error or complete is emitted, then it will never emit anything again

- We might want to unsubscribe from the observable

### Learn How Observables Work Under the Hood. Build Your Own HTTP Observable
- Make a call to the backend
- Fetch a list of courses to the Courses page
- Give insight into how Observables work and introduce all the RxJs operators we will be using later
- The sample data comes from our [REST API backend](http://localhost:9000/api/courses) already running on port 9000 
- Its payload is a json array containing a list of json objects of sample courses
- You probably want a JSON View plugin in your browser to prettify viewing JSON data like JSON Formatter, JSON Vue or others
- To make the call to the backend we will be using the browser fetch('url') api directly
  - This will give back a Promise that is very different from an Observable
    - A Promise will immediately be executed once we define it, unlike an Observable that will only be triggered in response to a subscription
  - We will create a custom Observable to represent this http call to the backend and turn it into an RxJs stream
    - We need to pass a function that implements the behaviour of our Observable to the new method; the network fetch
    - The observer will allow us to emit new values, error out or complete the observable
    - The observable does not allow to emit values on its behalf, we can only subscribe to it and get values from the stream of values
    - The observer should be kept private to the implementation of the observable and allows us to
      - emit our value for our stream by calling the next() method
      - fail our stream by calling the error() method
      - complete our stream by calling the complete() method
    - The observer is internally implementing the Observable
    - The observer function will only be called when we subscribe to our (http) observable
      - When that happens and only then, we will call the fetch
      - If the request is successful we will apply the .then because this is a Promise, and we will receive the response
        - This response has amongst other things a body, an ok flag to tell us if a fatal error occurred, a status code
        - The response also have a json method that returns a Promise containing the response payload, which we will return to evaluate further down this promise chain
        - This means that if we call another .then later, we will get the json body of the response and not the response object itself
        - This is what we are going to emit it as the value emitted by our observable by calling the .next method
      - After emitting the value we are going to complete the observable because nothing else is going to be returning from the backend. Thus, we have terminated our http stream
      - We will also cover when a fatal error occurs, like a network error for instance, by also calling the .catch method
        - It immediately returns an equivalent Promise object, allowing to similarly chain calls to other promise methods.
        - We pass that error to our observer catch callback and are respecting the observable contract by either completing or failing the observable
    - Note that when creating our own observables, it is up to us to make sure we respect the observable contract
 - Now we have a complete implementation of our http observable
 - Without subscribing to it however it will not get executed. We have only created the definition of the stream. In order to do create a concrete instance of that stream that we need to subscribe to it
   - Here we will be getting a list of courses that we print to the console
     - We will provide an error handling callback, empty at present and left for later to handle
       - To make the code more readable we will pass the RxJs `noop` function (no operation) instead of an empty callback `() => {}`
     - We will also provide a completion handling callback to confirm our stream is completed
- It is essential to follow the observable contract when creating your custom observable 
- The advantage of going to the trouble of transforming the Promise to an Observable is to be able to make use of any and all the RxJs operators to easily combine our stream of values with other streams of values

- Notes:
  - The `Observable.create()` is deprecated use the `new Observable()` pattern instead
  - If the compiler complains about the `allowSyntheticDefaultImports` flag, simply set it in `tsconfig.json`

## Essential RxJs Operators + Reactive Design

### What are RxJs Operators? Learn the Map Operator
- The map() operator will be used to transform the incoming data from the observable into a list of courses
- `courses` will be another Observable that emits an array of courses
- The map operator will take a function and output another observable
- An operator is essentially a wat to take one Observable and make another

- First we extract the old observable into a separate function and place it in a util file to be used by multiple components
- Whenever we want to derive new observables from existing observables, we need to use one of the RxJs operators by calling the `pipe()` function
  - The `pipe()` function is what allows to chain multiple operators
  - The `map()` operator take a function as the single argument with the values getting emitted earlier in the chain. The output will be the transformed values, in this case an array of courses

### Building Components with RxJs - Imperative Design
- How to use RxJs observables to build components using a reactive design
- We will have two sets of courses that are derived from the same observable
- First we will switch our observable to the Home component
- We will create arrays for both types of courses that will be used in the html
- How to populate these variables
  - One way is to do it directly in the success callback of the subscribe method
- The problem is this will not scale very well in complexity. We will very quickly end up with nested subscribe blocks
- Note: Replace `courses` with `(courses:Array<Course>)` in the part of subscribe to get this code typesafe
- Spoiler alert, this is an RxJs Anti-Pattern

### Building Components with RxJs - Reactive Design
- We will define the variables as observables instead of Arrays of Courses directly
- Assign a new observable that is derived from the http observable using `.pipe`
- Now we can use the observables directly in our template by extracting the values there
- We could manually assign it and subscribe to it there, but in Angular we can use the convenient `async` pipe
  - The `async` pipe in Angular will subscribe to the observable and assign the data for us. It will also unsubscribe when the component gets destroyed
  - The means we don't need to manually subscribe to the observable ourselves
- Our data will have gone through both mapping operations
  - The first to transform the data to an array of courses
  - The second to filter the courses and that will be done for both final lists 
- This is the reactive version, we don't use the subscribe method, instead we simply define the streams of values 
- It will however make the call to the backend twice which can be avoided with the `.shareReplay()` operator next

### Sharing HTTP Responses with the shareReplay Operator

- The `.shareReplay()` operator solves the problem of calling the backend once for each subscription
- It will share the replay of the stream of values to each subscriber
- We will also introduce the `.tap()` operator that is used to produce side effects in our observables chain
  - It can be used to introduce a variable at the level of the component or to issue a logging statement
- Note: Replace `.shareReplay()` with `.shareReplay<Course[]>()` to get this code typesafe

### RxJs Higher-Order Mapping Operators PDF
- In this next few lessons, we are going cover in detail the RxJs Higher-Order Mapping Operators: concatMap, mergeMap, exhaustMap and mergeMap.
- This [PDF guide](rxjs-higher-order-mapping.pdf) (37 pages) covers the same topics as the videos lessons, but it's searchable for later reference

### Observable Concatenation - In-Depth Explanation
- Introducing the `of()` function, useful for defining all sorts of observables
- Sequential concatenation of all values in all streams. Concatenates multiple Observables together by sequentially emitting their values, one Observable after the other 
- As a side note we can pass a reference to console.log directly. This is in the end also a function that takes one argument as an argument and logs it to the screen.
- So the subscribe method we can also pass references to functions defined elsewhere in our code 
- Remember that the next stream of values concatenated will not be called until the previous stream is closed, thus if it is never completed the following streams will never get called 

### Form Draft Pre-Save Example and the RxJs Filter Operator

- The angular framework provides an observable that emits a stream of the values that are contained in the form: `this.form.valueChanges`
- This will emit the values when any change of any values in the form occurs (including keyUp events)
- We can use the RxJs `filter` operator to filter out certain values of the stream 
- This operator takes a predicate function that must return a boolean
  - If that value is `true` it means that the value should be included in the output
  - If that value is `false` it means that the value should be excluded from the output
  - A common use for this could be the `this.form.valid`
- Then for the save operation we would like to handle it with Observables
  - We covert the fetch Promise into an Observable using the `fromPromise()` function
  - This is of course an Anti-Pattern, as we are nesting our observables and sending a lot of unnecessary requests
- What we want to do is wait for the operation to complete before issuing a save
  - In addition, this way we have no actual guarantee the last save operation received by the server is the actual last operation we sent
- We need Observable concatenation logic to know the first save operation is finished before launching the second

### The RxJs concatMap Operator - In-Depth Explanation and Practical Example

### Understanding the merge Observable combination Strategy

- Here we will use another strategy for combining observables, the `.merge()`
- Merge is ideal for performing Asynchronous operations in parallel
- The merged observables are only considered completed when ALL the underlying merged observables are completed 
- The merged observables will error out immediately if ANY of the underlying merged observables are errored out
- The merge strategy is ideal for performing long-running operations in parallel

### The RxJs mergeMap Operator - In-Depth Explanation

- The mergeMap Operator maps each value to an Observable, then flattens all of these inner Observables using mergeAll
- `mergeMap` makes it work in `parallel` (work asynchronously) , as opposed to the `concatMap` that makes it work in `sequence` (preserving order)

### The RxJs exhaustMap Operator - In-Depth Explanation
- 
- The exhaustMap Operator maps each value to an Observable, then flattens all of these inner Observables using exhaust. Ignoring values arriving while executing a previous one
- This is exactly what we want when ignoring multiple click events 

### Unsubscription In Detail - Implementing a Cancellable HTTP Observable

- We use an `Abort Controller` that provides an `AbortSignal`
- This is then called as part of the return of the fetch function. This is the actual cancellation and will be called by the actual application when unsubscribing

### Setting Up the Course Component

### Building a Search Typeahead - debounceTime and distinctUntilChanged Operators

- This will cover some new operators, namely the `.debounceTime()` and `.distinctUntilChanged()`
- The debounceTime Operator is like delay, but passes only the most recent value from each burst of emissions, based on a defined delay
- The distinctUntilChanged Operator will remove duplicate values from our stream of values

### Finishing the Search Typeahead - The switchMap Operator

- The switchMap Operator maps each value to an Observable, then flattens all of these inner Observables using switch. Cancelling execution of old values when a new value arrive, by switching to the new one

## RxJs Error Handling

### RxJs Error Handling - PDF Guide

- In this next few lessons, we are going cover in detail the multiple strategies available for RxJs Error Handling.
- This [PDF guide](rxjs-error-handling.pdf) (30 pages) covers the same topics as the videos lessons, but it's searchable for later reference

### RxJs Error Handling - The Catch and Replace Error Handling Strategy

- How error behave in RxJs
  - How to catch errors
  - How to handle errors
  - How to attempt to recover from errors
  - How to retry an Observable if something goes wrong
- Multiple strategies are available
  - We can catch the error and try to recover by providing alternative values
  - We can catch the error, log it to the console and then rethrow it to an outer Observable
  - We can try to retry the operation that failed

- To implement the first strategy we use the `catchError()` operator
  - Note this Observable does not have to be built using the of() operator, this can potentially be any Observable. It is a replacement Observable that replaces the errored out Observable

### The Catch and Rethrow RxJs Error Handling Strategy and the finalize Operator

- The fetch API catch error block is only going to be triggered in case of a fatal error. Like as a network failure, a DNS failure and such
- When other recoverable errors occurs, like a 500 or similar, we will error out our observables too by using the OK flag from the response object and error out the Observable
- To implement the second strategy, the catch and rethrow strategy, we use the `throwError()` utility method
- Cleanup Logic can be implemented using the `.finalize()` operator
  - This function will be invoked in one of two cases, when the observable completes or when it errors out
- If we move the catchError operator before the other operators, we will bypass the whole Observable chain and only execute the catchError block once. But we see that finalize is executed twice which is as expected
  - We could also move the finalize block earlier to execute that only once as well if that ois what we want

### The Retry RxJs Error Handling Strategy.screenFlow

- To implement the retry strategy we use the `retryWhen()` operator
  - It receives an errors observable that will emit an error each time we are retrying and throws an error
  - `retryWhen()` will create and subscribe a new stream for each time it tries until it does not error out
  - The observable will tell to `retryWhen()` when to try again, so we can simply return the errors observable itself to make it try again immediately : `retryWhen(errors => errors)`
  - In reality, we would want to have a delay by building a [`delayWhen()`](https://rxjs.dev/api/operators/delayWhen) operator with a `.timer()` operator into the observable
    - Note the deprecation warning of using delayWhen() with an empty notifier

### The startWith RxJs Operator - Simplifying the Course Component

- Initialize a stream of values with some initial values using the [`startWith()`](https://rxjs.dev/api/operators/startWith) operator
- Instead of using concat we are going to assign the output of our typeahead logic in the lessons observable

### RxJs Throttling vs Debouncing - Understand the Differences

- Debouncing is waiting for a value to become stable
- Throttling are limiting the number of values that can be emitted in a given interval

## Building a RxJs Custom Operator

### Implementing a Custom RxJs Operator - the Debug Operator

### The RxJs Debug Operator - Implementation Conclusion

### The RxJs forkJoin Operator - In-Depth Explanation and Practical Example

- Introduce the [`forkJoin()`](https://rxjs.dev/api/index/function/forkJoin) operator making us able to launch several tasks in parallel, wait for those tasks to complete, and then use the combined results together

## RxJs Subjects and the Store Pattern

### Subjects and Stores - New Section Kickoff

- NOTE: New base code. All code created up until now in this course is gone!

- This will cover the Store Observable Pattern
- We will first introduce the notion of RxJs Subject and talk about different types of Subjects
  - Plain Subjects
  - Behaviour Subjects
  - Async Subjects
  - Replay Subjects
- We will introduce a few more RxJs Operators that are commonly used with the Store Pattern

### What are RxJs Subjects? A Simple Explanation

- It's better to create Observables as much as possible, but if...
  - some of those methods are not convenient
  - or if we run into as source of data that is not easily transformable into an Observable
  - or if we are doing multicasting of one value to multiple separate observable consumers   
  - then we might want to look into the notion of Subjects
- A Subject is both an observer and an Observable at the same time
- A Subject also has the same `.next()`, `.complete()`, `.error()`, `.pipe()` methods as an Observable
- The Subject is meant to be private to the part of the application that is emitting a given set of data 
- We have no way of providing unsubscribe logic to an Observable that gets defined from a Subject 
- We should use Subjects as little as possible and derive our Observables directly from the source instead






### BehaviorSubject In Detail - When to Use it and Why?
### AsyncSubject and ReplaySubject - Learn the Differences
### Store Service Design - What Subject to Use?
### The Store Pattern - Loading Initial Data, Selector Methods, Consuming Data
### BehaviorSubject Store - Example of a Data Modification Operation
### Refactoring the Course Component for Using the Store
### Forcing the Completion of Long Running Observables - First and Take Operators
### The withLatestFrom RxJs Operator - Detailed Explanation

## Conclusion
### Bonus Lecture
### RxJs In Practice Course Conclusion and Key Takeaways
