import { Component, OnInit } from '@angular/core';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app';
  progressRef: NgProgressRef;
  constructor(private progressService: NgProgress) {
    this.progressRef = this.progressService.ref('app-progress-bar');}

  ngOnInit() {
    const sampleUrl = 'http://slowwly.robertomurray.co.uk/delay/6000/url/https://jsonplaceholder.typicode.com/posts/1';

    this.progressRef.start();
    setTimeout(() => {
      this.progressRef.set(0.1);
    }, 1000);
    setTimeout(() => {
      this.progressRef.inc(0.2);
    }, 2000);
    //this.http.get(sampleUrl)
    //  .subscribe((response) => {
    //    this.progressRef.done();
    //    this.posts = response.json();
    //  });
  }
}
