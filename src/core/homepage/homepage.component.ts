import { Component, OnInit, AfterViewInit } from '@angular/core';

//  Imports all Services
import { WebSocketService } from '../../shared/services/websocket-service';
import { UserService } from '../../shared/services/user-service';
import * as $ from 'jquery';
import * as _ from 'lodash';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.pug',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  private images = [];
  private preSelectedPane;
  private location;
  private lat;
  private lng;
  private zoom;
  private username    :    String;
  
  // Boolean variables
  isSignedIn      :      Boolean = false;

  constructor(
    private socketService:  WebSocketService,
    private userService:    UserService
  ) { }

  // Life Cycle Hooks

  ngOnInit() {
    // Check for user object in the client session
    this.userService.isLoggedIn().subscribe((response: any) => {
      if(_.get(response, 'status.code') === 200) {
        this.getUserParams(response);
      }
    });

    $('.modal').modal();
    
  }

  // Custom functions

  closeModal(response) {
    $('.modal').modal('close');
    this.getUserParams(response);
  }

  getUserParams(response) {
    this.isSignedIn = true;
    this.username = response.data.username;
  }

  setSelectedTab(preSelectPane){
    this.preSelectedPane =  preSelectPane;
  }
}