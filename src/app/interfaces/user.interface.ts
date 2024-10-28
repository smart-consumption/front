export interface City {
    id: string;
    name: string;
    department: string;
  }
  
  export interface User {
    id: string;
    username: string;
    name: string | null;
    reviews: any | null;
    watchList: any[];
    city: City;
  }
  
  export interface ApiResponse {
    data: User[];
    status: number;
    message: string;
  }