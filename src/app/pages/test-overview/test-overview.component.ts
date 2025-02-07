import { Component } from '@angular/core';
import {TypologieTestsComponent} from './typologie-tests/typologie-tests.component';
import {MatTab, MatTabGroup} from '@angular/material/tabs';

@Component({
  selector: 'app-test-overview',
  imports: [
    TypologieTestsComponent,
    MatTabGroup,
    MatTab
  ],
  templateUrl: './test-overview.component.html',
  styleUrl: './test-overview.component.css'
})
export class TestOverviewComponent {

}
