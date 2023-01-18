import { Component, OnInit } from '@angular/core';
import { SidebarSecreService } from '../../services/sidebar-secre.service';

@Component({
  selector: 'app-sidebar-secre',
  templateUrl: './sidebar-secre.component.html',
  styleUrls: ['./sidebar-secre.component.css']
})
export class SidebarSecreComponent implements OnInit {

  menuItems?: any[];
  constructor(private sidebarService: SidebarSecreService) {
    this.menuItems = this.sidebarService.menu
  }

  ngOnInit(): void {
  }

}
