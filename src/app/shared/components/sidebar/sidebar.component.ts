import { fromEvent } from 'rxjs';
import { SubSink } from 'subsink';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  public sidebarIsOpen: boolean;
  private subscriptions = new SubSink();
  private trigger = 'notifications-icon'; // On headerComponent view Template
  
  constructor(
  ) {
    this.sidebarIsOpen = false;
  }

  ngOnInit(): void {
    const element = document.getElementById(this.trigger);
    const evenTrigger = fromEvent(element!, 'click');

    this.subscriptions.add(
      evenTrigger
        .subscribe(() => {
          console.log('click');
          this.sidebarIsOpen = !this.sidebarIsOpen
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}