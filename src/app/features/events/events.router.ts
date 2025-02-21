import { RouterModule, Routes } from "@angular/router";
import { EventCreateComponent } from "./pages/event-create/event-create.component";
import { NgModule } from "@angular/core";
import { EventListComponent } from "./pages/event-list/event-list.component";


export const EVENTS_ROUTES: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: EventListComponent },
    { path: 'create', component: EventCreateComponent }
  ];

  @NgModule({
    imports: [RouterModule.forChild(EVENTS_ROUTES)],
    exports: [RouterModule]
  })
  export class EventsRoutingModule { }