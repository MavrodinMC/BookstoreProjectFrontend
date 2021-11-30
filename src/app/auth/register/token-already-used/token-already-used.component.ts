import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-token-already-used',
  templateUrl: './token-already-used.component.html',
  styleUrls: ['./token-already-used.component.css']
})
export class TokenAlreadyUsedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  backToHomepage() {
    this.router.navigate(['/']);
  }
}
