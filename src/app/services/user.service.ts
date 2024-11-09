import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ApiResponse, User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/smart-consumption/api/v1/user/watchlist'; // Reemplaza con tu URL

  constructor(private http: HttpClient) {}

  getUsers(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl)
      .pipe(
        catchError((error) => {
          console.error('Error en el servicio:', error);
          throw error;
        })
      );
  }

  addUser(user: User): Observable<ApiResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(user);
    return this.http.post<ApiResponse>(this.apiUrl, body, { headers })
    .pipe(
      catchError((error)=>{
        console.error('Error al agregar el usuario: ', error);
        throw error;
      })
    );
  }

  updateUser(user: User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  addToWatchlist(userId: string, productId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}/${productId}`);
  }

  getWatchlist(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }
}