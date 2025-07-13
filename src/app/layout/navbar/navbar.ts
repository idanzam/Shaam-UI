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


     constructor(
                  public layoutService: LayoutService
                ){}

    ngOnInit() {

        // Keep darkMode updated with the LayoutService state
        this.layoutService.configUpdate$.subscribe(() => {
          this.darkMode = this.layoutService.layoutConfig().darkTheme ?? false;
        });
        this.getData();
               
    }

    getData(){

      this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home'
            },
            {
                label: 'Features',
                icon: 'pi pi-star'
            },
            {
                label: 'Projects',
                icon: 'pi pi-search',
                items: [
                    {
                        label: 'Components',
                        icon: 'pi pi-bolt'
                    },
                    {
                        label: 'Blocks',
                        icon: 'pi pi-server'
                    },
                    {
                        label: 'UI Kit',
                        icon: 'pi pi-pencil'
                    },
                    {
                        label: 'Templates',
                        icon: 'pi pi-palette',
                        items: [
                            {
                                label: 'Apollo',
                                icon: 'pi pi-palette'
                            },
                            {
                                label: 'Ultima',
                                icon: 'pi pi-palette'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Contact',
                icon: 'pi pi-envelope'
            }
        ]

    }

    toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({ 
      ...state, 
      darkTheme: !state.darkTheme // ✅ Properly toggles dark mode
    }));
  }
}
