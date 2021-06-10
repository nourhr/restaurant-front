import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';


@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    let headers = request.headers.set('Access-Control-Allow-Origin', '*');

      headers = headers.append('content-type', 'application/json')
        .append('Access-Control-Allow-Headers', 'Content-Type')
        .append('Accept', 'application/json')


    request = request.clone({headers});



    return next.handle(request);

  }
}
