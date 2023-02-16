import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { SidebarSecreService } from '../../services/sidebar-secre.service';

@Component({
  selector: 'app-sidebar-secre',
  templateUrl: './sidebar-secre.component.html',
  styleUrls: ['./sidebar-secre.component.css']
})
export class SidebarSecreComponent implements OnInit {

  menuItems?: any[];
  personal:string='';
  constructor(private sidebarService: SidebarSecreService,private loginService:LoginService) {
    this.menuItems = this.sidebarService.menu;
    this.personal = sessionStorage.getItem('usuario')!;
  }

  ngOnInit(): void {
  }
  logout(){
    this.loginService.loggoud();
  }
}
