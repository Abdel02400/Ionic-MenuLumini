import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { RedditDataProvider } from '../providers/reddit-data/reddit-data';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: any;

  Niveau1 = null;
  Niveau2 = null;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public redditService: RedditDataProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.redditService.getMenu()
    .subscribe((response)=> {
        this.pages = response;
        console.log(this.pages);
    });

  }

  toggleNiveau1(idx) {
    if (this.isNiveau1Shown(idx)) {
      this.Niveau1 = null;
    } else {
      this.Niveau1 = idx;
    }
  };

  toggleNiveau2(idx) {
    if (this.isNiveau2Shown(idx)) {
      this.Niveau1 = null;
      this.Niveau2 = null;
    } else {
      this.Niveau1 = idx;
      this.Niveau2 = idx;
    }
  };

  isNiveau1Shown(idx) {
    return this.Niveau1 === idx;
  };

  isNiveau2Shown(idx) {
    return this.Niveau2 === idx;
  };

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
