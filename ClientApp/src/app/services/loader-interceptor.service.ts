// loader-interceptor.service.ts
import { Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  private totalReqCount = 0;

  constructor(private loaderService: LoaderService) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(req);

    console.log("No of requests--->" + this.requests.length)
    this.totalReqCount = this.requests.length;
    this.setLoader();
  
    return new Observable(observer => {
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.setLoader();
              if (this.requests.length > 1) {
                this.removeRequest(req);
              }
              observer.next(event);
            }
          },
          err => {
            alert('error' + err);
            this.removeRequest(req);
            observer.error(err);
          },
          () => {
            this.setLoader();
            this.removeRequest(req); observer.complete();
          });

      // In case of cancelled requests
      return () => {
        this.removeRequest(req);
        this.setLoader();
        subscription.unsubscribe();
      };
    });
  }
  setLoader() {
    if (this.requests.length >= 1) {
      const status = ((this.totalReqCount - this.requests.length) / this.totalReqCount) * 100;
      this.loaderService.setStatus(status);
    } else {
      this.loaderService.incStatus(100);
      this.loaderService.stopLoading();
    }
  }
}
