import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {Observable, of} from 'rxjs';
import {catchError, map, shareReplay, tap} from 'rxjs/operators';
import {createHttpObservable} from "../common/util";


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnersCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    ngOnInit() {

      const http$ = createHttpObservable("/api/courses")

      const courses$: Observable<Course[]> = http$
        .pipe(
          tap(()=> console.log("HTTP request executed")),
          map(res => Object.values(res["payload"])),
          shareReplay<Course[]>(),
          catchError(err => of([
            {
              id: 0,
              description: "RxJs In Practice Course",
              iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png',
              courseListIcon: 'https://angular-academy.s3.amazonaws.com/main-logo/main-page-logo-small-hat.png',
              longDescription: "Understand the RxJs Observable pattern, learn the RxJs Operators via practical examples",
              category: 'BEGINNER',
              lessonsCount: 10
            }
          ]))
        );

      this.beginnersCourses$ = courses$.pipe(
        map(courses => courses.filter(course => course.category == 'BEGINNER'))
      );
      this.advancedCourses$ = courses$.pipe(
        map(courses => courses.filter(course => course.category == 'ADVANCED'))
      );


    }

}
