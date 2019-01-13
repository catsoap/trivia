import { Injectable } from '@angular/core';
import User from '../../../user/user.interface';
import {StorageService} from '../storage/storage.service';
import {Observable, Subject} from 'rxjs';

const apiAdorableAvatar = 'https://api.adorable.io/avatars/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userSubject: Subject<User> = new Subject<User>();

  constructor(private storageService: StorageService) { }

  saveUser<T>(user: User): Promise<T> {
    this.userSubject.next(user);
    return this.storageService.set('user', user);
  }

  loadUser() {
    this
      .storageService
      .get('user')
      .then((user: User) => this.userSubject.next(user))
      .catch(error => console.error(error))
    ;
  }

  getUser(): Observable<User> {
    this.loadUser();
    return this.userSubject.asObservable();
  }


  deleteUser(): Promise<any> {
    this.userSubject.next(null);
    return this.storageService.remove('user');
  }

  generateAvatar(sizeImage: string = '185'): string {
    const anysize = 3;
    const charset = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < anysize; i++ ) {
        result += charset[Math.floor(Math.random() * charset.length)];
    }

    return `${apiAdorableAvatar}${sizeImage}/${result}.png`;
  }
}
