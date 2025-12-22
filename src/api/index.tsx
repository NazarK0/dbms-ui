import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiEndpointsAdminMock } from './endpoints';


export type ApiEndpointFn = () => ReturnType<typeof useQuery>;
export type ApiEndpoint = ApiEndpointFn | string;

export interface AdminAppAPI {
    get: {
        dashboard: {
            widgets: {
                list: ApiEndpoint;
                databasesCount: ApiEndpoint;
                adminsCount: ApiEndpoint;
                recentActivity: ApiEndpoint;
                usersCount: ApiEndpoint;
                tablesCount: ApiEndpoint;
                usedStorage: ApiEndpoint;
                performance: ApiEndpoint;
                activeConnections: ApiEndpoint;
            }
        }

    }
}

class ApiClient {
    private _adminApp: AdminAppAPI;
        

  constructor() {
    this._adminApp = {
      get: {
        dashboard: {
            widgets: {
                list: () => useQuery({ queryKey: ['Dashboard/getDashboardWidgets'], queryFn: this.getDashboardWidgets }),
                databasesCount: () => useQuery({ queryKey: ['Dashboard/Widget/databasesCount'], queryFn: this.getDashboardWidgetDatabasesCount }),
                adminsCount: () => useQuery({ queryKey: ['Dashboard/Widget/adminsCount'], queryFn: this.getDashboardWidgetAdminsCount }),
                usersCount: () => useQuery({ queryKey: ['Dashboard/Widget/usersCount'], queryFn: this.getDashboardWidgetUsersCount }),
                tablesCount: () => useQuery({ queryKey: ['Dashboard/Widget/tablesCount'], queryFn: this.getDashboardWidgetTablesCount }),
                usedStorage: () => useQuery({ queryKey: ['Dashboard/Widget/usedStorage'], queryFn: this.getDashboardWidgetUsedStorage }),
                performance: () => useQuery({ queryKey: ['Dashboard/Widget/performance'], queryFn: this.getDashboardWidgetPerformance }),
                recentActivity: () => useQuery({ queryKey: ['Dashboard/Widget/recentActivity'], queryFn: this.getDashboardWidgetRecentActivity }),
                activeConnections: () => useQuery({ queryKey: ['Dashboard/Widget/activeConnections'], queryFn: this.getDashboardWidgetActiveConnections }),
          }
        }
      }
    }
  }

  adminApp() {
    return this._adminApp;
  }

  private getDashboardWidgets = async () => {
    // const { data } = await axios.get(apiEndpoints.admin.dashboard.widgets.list);
    const data = await import(`${apiEndpointsAdminMock.get.dashboard.widgets.list}`);
    return data;
  }

  private getDashboardWidgetDatabasesCount = async () => {
    // const { data } = await axios.get(apiEndpoints.admin.dashboard.widgets.databasesCount);
    const data = await import(`${apiEndpointsAdminMock.get.dashboard.widgets.databasesCount}`);
    return data;
}
  private getDashboardWidgetAdminsCount = async () => {
    // const { data } = await axios.get(apiEndpoints.admin.dashboard.widgets.adminsCount);
    const data = await import(`${apiEndpointsAdminMock.get.dashboard.widgets.adminsCount}`);
    return data;
}
  private getDashboardWidgetRecentActivity = async () => {
    // const { data } = await axios.get(apiEndpoints.admin.dashboard.widgets.recentActivity);
    const data = await import(`${apiEndpointsAdminMock.get.dashboard.widgets.recentActivity}`);
    return data;
}
  private getDashboardWidgetUsersCount = async () => {
    // const { data } = await axios.get(apiEndpoints.admin.dashboard.widgets.usersCount);
    const data = await import(`${apiEndpointsAdminMock.get.dashboard.widgets.usersCount}`);
    return data;
}
  private getDashboardWidgetTablesCount = async () => {
    // const { data } = await axios.get(apiEndpoints.admin.dashboard.widgets.tablesCount);
    const data = await import(`${apiEndpointsAdminMock.get.dashboard.widgets.tablesCount}`);
    return data;
}
  private getDashboardWidgetUsedStorage = async () => {
    // const { data } = await axios.get(apiEndpoints.admin.dashboard.widgets.usedStorage);
    const data = await import(`${apiEndpointsAdminMock.get.dashboard.widgets.usedStorage}`);
    return data;
}
  private getDashboardWidgetPerformance = async () => {
    // const { data } = await axios.get(apiEndpoints.admin.dashboard.widgets.performance);
    const data = await import(`${apiEndpointsAdminMock.get.dashboard.widgets.performance}`);
    return data;
}
  private getDashboardWidgetActiveConnections = async () => {
    // const { data } = await axios.get(apiEndpoints.admin.dashboard.widgets.activeConnections);
    const data = await import(`${apiEndpointsAdminMock.get.dashboard.widgets.activeConnections}`);
    return data;
}

}


// Export singleton instance
export const api = new ApiClient();






