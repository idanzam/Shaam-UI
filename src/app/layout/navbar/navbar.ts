import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

    items: MenuItem[] | undefined;
    darkMode: boolean = false; // Ensure boolean value

    constructor(public layoutService: LayoutService){}

    ngOnInit() {

        this.layoutService.configUpdate$.subscribe(() => {
          this.darkMode = this.layoutService.layoutConfig().darkTheme ?? false;
        });
        this.getData();        
    }

    getData(){
      this.items = [
            {
                label: 'בית',
                icon: 'pi pi-home'
            }, 
        ]
    }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ 
        ...state, 
        darkTheme: !state.darkTheme // ✅ Properly toggles dark mode
        }));
    }
}
