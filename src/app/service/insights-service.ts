import { Injectable } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
// import { DataStore } from '../model/datastore';
import { environment } from '../environments/environment';
// import { ManageUserService } from './manage-user.service';

@Injectable()
export class AppInsightsService {
    appInsights: ApplicationInsights;
    constructor() {
        this.appInsights = new ApplicationInsights({
            config: {
                instrumentationKey: environment.insightsSecret,
                enableAutoRouteTracking: true // option to log all route changes
            }
        });
        this.appInsights.loadAppInsights();

        this.appInsights.addTelemetryInitializer((telemetryItem: any) => {
            telemetryItem.tags['ai.cloud.role'] = environment.telemetryTag; //TODO: Provide env info also here
        });
    }

    logPageView(name?: string, url?: string) { // option to call manually
        this.appInsights.trackPageView({
            name: name,
            uri: url
        });
    }

    updateDefaultProperties() {
        // const selectedCustomer = JSON.parse(DataStore.retrieveSelectedCustomer());

        this.appInsights.addTelemetryInitializer((envelope: any) => {
            var item: any = envelope.baseData;
            item.properties = item.properties || {};
            // item.properties["CustomerName"] = selectedCustomer.customerName;
            // item.properties["UserID"] = this.manageUserService.getLoggedInUserEmail();
        });
    }

    logEvent(name: string, properties?: { [key: string]: any }) {
        this.appInsights.trackEvent({ name: name }, properties);
    }

    logMetric(name: string, average: number, properties?: { [key: string]: any }) {
        this.appInsights.trackMetric({ name: name, average: average }, properties);
    }

    logException(exception: Error, severityLevel?: number) {
        this.appInsights.trackException({ exception: exception, severityLevel: severityLevel });
    }

    logTrace(message: string, properties?: { [key: string]: any }) {
        this.appInsights.trackTrace({ message: message }, properties);
    }
}