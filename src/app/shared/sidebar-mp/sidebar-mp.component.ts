import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { SidebarMpService } from 'src/app/services/sidebar-mp.service';

@Component({
  selector: 'app-sidebar-mp',
  templateUrl: './sidebar-mp.component.html',
  styleUrls: ['./sidebar-mp.component.css']
})
export class SidebarMpComponent implements OnInit {

  menuItems?: any[];
  personal:string='';
  constructor(private sidebarService: SidebarMpService, private loginService:LoginService) {
    this.menuItems = this.sidebarService.menu;
    this.personal = sessionStorage.getItem('usuario')!;
  }

  ngOnInit(): void {
  }
  logout(){
    this.loginService.loggoud();
  }
}
