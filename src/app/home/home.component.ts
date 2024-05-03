import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {noop} from 'rxjs';
import {map} from 'rxjs/operators';
import {createHttpObservable} from "../common/util";


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnersCourses: Course[];

    advancedCourses: Course[];

    ngOnInit() {

      const http$ = createHttpObservable("/api/courses")

      const courses$ = http$
        .pipe(
          map(res => Object.values(res["payload"])),
        );

      courses$.subscribe(
        (courses:Array<Course>) => {

          // Note: this is not a filter operator, just a plain filtering operation
          // Note: also this must is not type safe and need to get ignored
          this.beginnersCourses = courses.filter(course => course.category == 'BEGINNER');
          this.advancedCourses = courses.filter(course => course.category == 'ADVANCED');
          console.log(courses)
        },
        noop,
        () => console.log('completed')
      );


    }

}
