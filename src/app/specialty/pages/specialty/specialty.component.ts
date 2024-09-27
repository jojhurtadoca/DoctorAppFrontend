import {  Component } from '@angular/core';
import { ListSpecialtyComponent } from "../list/list.component";

@Component({
  selector: 'app-specialty',
  standalone: true,
  imports: [ListSpecialtyComponent],
  templateUrl: './specialty.component.html',
  styleUrl: './specialty.component.css'
})
export class SpecialtyComponent{
}
