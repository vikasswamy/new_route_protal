import { Injectable } from '@angular/core';

@Injectable()
export class Spinner {

    public subscribers: any = {};

    public publish (type: any, data: any = undefined) {
        for (var key in this.subscribers[type]) {
            this.subscribers[type][key](data);
        }
    }

    public subscribe (type: any, subscriberId: string, callback: Function) {
      
        if (!this.subscribers[type]) {
            this.subscribers[type] = {};
        }
        this.subscribers[type][subscriberId] = callback;
    }

    public unsubscribe(type: any, subscriberId: string) {
        if (this.subscribers[type]) {
            delete this.subscribers[type][subscriberId];
        }
    }

    public showSpinner() {
        this.publish(SpinnerType.SPINNER, true);
    }

    public hideSpinner() {
        this.publish(SpinnerType.SPINNER, false);
    }
}

export enum SpinnerType {
    SPINNER
}