import { RouterModule, Routes } from "@angular/router";
import { EventCreateComponent } from "./pages/event-create/event-create.component";
import { NgModule } from "@angular/core";


export const EVENTS_ROUTES: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: EventCreateComponent },
    { path: 'create', component: EventCreateComponent }
  ];

  @NgModule({
    imports: [RouterModule.forChild(EVENTS_ROUTES)],
    exports: [RouterModule]
  })
  export class EventsRoutingModule { }