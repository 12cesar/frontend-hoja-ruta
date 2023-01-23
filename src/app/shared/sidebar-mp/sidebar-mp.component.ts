import { Component, OnInit } from '@angular/core';
import { SidebarMpService } from 'src/app/services/sidebar-mp.service';

@Component({
  selector: 'app-sidebar-mp',
  templateUrl: './sidebar-mp.component.html',
  styleUrls: ['./sidebar-mp.component.css']
})
export class SidebarMpComponent implements OnInit {

  menuItems?: any[];
  constructor(private sidebarService: SidebarMpService) {
    this.menuItems = this.sidebarService.menu
  }

  ngOnInit(): void {
  }

}
