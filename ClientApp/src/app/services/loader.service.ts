//loader.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';

@Injectable({
  providedIn: 'root'
})

export class LoaderService {
  progressRef: NgProgressRef;
  public isLoading = new BehaviorSubject(true);
  constructor(public progress: NgProgress) {
    this.progressRef = progress.ref('app-progress-bar');
  }
  startLoading() {
    this.progressRef.start();
  }

  setStatus(status: number) {
    this.progressRef.set(status);
  }

  incStatus(percentage: number) {
    this.progressRef.inc(percentage);
  }

  stopLoading() {
    this.progressRef.complete();
  }
}
