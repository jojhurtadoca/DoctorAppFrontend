import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Session } from '../user/interfaces/session.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private _snackBar: MatSnackBar) { }

  showAlert(message: string, type: string) {
    this._snackBar.open(message, type, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000,
    });
  }

  saveSession(session: Session) {
    debugger;
    localStorage.setItem("session", JSON.stringify(session.userName));
  }

  getSession() {
    debugger;
    const sessionString = localStorage.getItem("session");
    const token = JSON.parse(sessionString!);
    return token;
  }

  removeSession() {
    localStorage.removeItem("session");
  }
}
