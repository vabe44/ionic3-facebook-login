import { Component } from '@angular/core';

import { MessagesPage } from '../messages/messages';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MessagesPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
