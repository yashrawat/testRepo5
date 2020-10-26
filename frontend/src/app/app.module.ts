import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/utils/header/header.component';
import { FooterComponent } from './components/utils/footer/footer.component';
import { ErrorComponent } from './components/utils/error/error.component';
import { HomepageComponent } from './components/utils/homepage/homepage.component';
import { PagenotfoundComponent } from './components/utils/pagenotfound/pagenotfound.component';
import { ContactUsComponent } from './components/utils/contact-us/contact-us.component';
import { FaqsComponent } from './components/utils/faqs/faqs.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    HomepageComponent,
    PagenotfoundComponent,
    ContactUsComponent,
    FaqsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
