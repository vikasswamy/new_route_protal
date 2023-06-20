import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClientModule
} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Spinner } from '../commons/spinner';
import { MatDialog } from '@angular/material/dialog';
import { InfoModal } from '../commons/info-modal/info-modal.component';
import { Router } from '@angular/router';
import {environment} from "../environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private pubSub: Spinner, public dialog: MatDialog, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const customerStr = localStorage.getItem('ABM_SELECTED_CUSTOMER');
    const customerId = customerStr ? JSON.parse(customerStr).customerId : null;

    const appStr = localStorage.getItem('ABM_SELECTED_APP');
    const role = appStr ? JSON.parse(appStr).role : null;
    const appID = appStr ? JSON.parse(appStr).appID : null;

    const authReq = req.clone({
      setHeaders: {
        'CustomerId': environment.local ? '1' : customerId.toString(),
        'Ocp-Apim-Subscription-Key': environment.smartRoutingTenantId,
        'Role': environment.local ? 'Super Admin' : role.toString(),
        'Acc': environment.acc,
        'appID': appID ? appID.toString() : ''
      }
    });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        this.pubSub.hideSpinner();

        if (error.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          // console.error('An error occurred:', error.error.message);

          const errorMessage = error.error.message;

          // TODO Turn this back on when dev complete.
          this.showErrorDialog('Error', errorMessage)
          alert(errorMessage);
        } else {
          // console.error(`Error code ${error.status}, Title: ${error.error}`);

          const errorCode = error.status;
          const errorTitle = 'Error Code: ' + errorCode;
          const errorMessage = error && error.error && error.error.title ? error.error.title : error.statusText;

          // TODO Turn this back on when dev complete.
          this.showErrorDialog(errorTitle, errorMessage)
          alert(errorMessage)
        }HttpClientModule

        return EMPTY;
      })
    );    
  }

  showErrorDialog(heading: string, message: string, callback: any = undefined) {
    this.dialog.open(InfoModal, {
      minWidth: '300px',
      data: {
        heading,
        message,
        callback
      },
      disableClose: true,
      panelClass: 'custom-modalbox'
    })
  }
}
