import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './features/users/pages/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { UserCardComponent } from './features/users/components/user-card/user-card.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { EventCreateComponent } from './features/events/pages/event-create/event-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventListComponent } from './features/events/pages/event-list/event-list.component';
import { EventItemComponent } from './features/events/components/event-item/event-item.component';
import { TitleComponent } from './common/title/title.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserCardComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    EventCreateComponent,
    EventListComponent,
    EventItemComponent,
    TitleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
