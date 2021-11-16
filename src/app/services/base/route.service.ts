import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  inventoryRoutes: any[] = [
    { route: "/app/inventory/home", name: "Home", label: 'Home', type: "" },
    { route: "/app/inventory/item-list", name: "items", label: 'Items', type: "form" },
    { route: "/app/inventory/category-list", name: "category", label: 'Categories', type: "list" },
  ]

  salesRoutes: any[] = [
    { route: "/app/sale/home", name: "Home", label: 'Home', type: "" },
    { route: "/app/sale/list", name: "salelist", label: 'Sale Invoices', type: "list" },
    { route: "/app/sale/form", name: "sale", label: 'Sale Invoice', type: "form" },
  ]

  customerRoutes: any[] = [
    { route: "/app/customer/list", name: "customer", label: 'Customers', type: "list" },
  ]

  servicecontractRoute: any[] = [
    {route: "app/servicecontractgenerator/ServiceContractForm", name: "ServiceContractForm", label: "servicecontractform", type: "form"}
  ]

  constructor() { }

  openRoute(module: string, name: string) {
    if (module == "sales") {
      var index = this.salesRoutes.findIndex(a => a.name == name);
      return this.salesRoutes[index].route;
    }
    else if (module == "inventory") {
      var index = this.inventoryRoutes.findIndex(a => a.name == name);
      return this.inventoryRoutes[index].route;
    } else if (module == "customer") {
      var index = this.customerRoutes.findIndex(a => a.name == name);
      return this.customerRoutes[index].route;
    }
    else if (module == "servicecontractgenerator") {
      var index = this.servicecontractRoute.findIndex(a => a.name == name);
      return this.servicecontractRoute[index].route;
    }
  }

  getRouteByType(module: string, type: string) {
    if (module == "sales") {
      return this.salesRoutes.filter(a => a.type == type);
    } else if (module == "inventory") {
      return this.inventoryRoutes.filter(a => a.type == type);
    } else if (module == "customer") {
      return this.customerRoutes.filter(a => a.type == type);
    }
  }

}
