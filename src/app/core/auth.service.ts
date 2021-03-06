import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { filter, map } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';

import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { SocketService } from './socket.service';

@Injectable()
export class AuthService {
  redirectUrl = '/rooms';
  user: User;

  constructor(private socketService: SocketService, private router: Router) {
    const currentJwt = localStorage.getItem('jwt');
    if (currentJwt) {
      this.onToken(currentJwt);
    }
    fromEvent(window, 'storage').pipe(
      filter((event: StorageEvent) => event.key === 'jwt'),
      map((event: StorageEvent) => event.newValue)
    )
    .subscribe(jwt => {
      this.onToken(jwt);
      this.router.navigate([this.redirectUrl]);
    });
  }

  openWcaOAuthPopup(): void {
    const params = new URLSearchParams();
    params.set('response_type', 'code');
    params.set('client_id', environment.wcaOAuthClientId);
    params.set('scopes', 'public');
    params.set('redirect_uri', `${environment.baseUrl}/oauth-callback`);
    const url = `${environment.wcaUrl}/oauth/authorize?${params.toString()}`;
    window.open(url, '', 'width=600,height=400');
  }

  signOut(): void {
    localStorage.removeItem('jwt');
    this.user = null;
    this.socketService.disconnect();
    this.router.navigate(['']);
  }

  /**
   * Extracts the user data from the given token and establishes websocket connection.
   */
  private onToken(jwt: string): void {
    this.user = jwtDecode<any>(jwt).user;
    this.socketService.connect(jwt);
  }
}
