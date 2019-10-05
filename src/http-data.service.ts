import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Emp } from "./app/add-emp/Emp";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HttpDataService {
  getEmpUri = "http://localhost:5000/api/v1/getEmpls";
  addEmpUri = "http://localhost:5000/api/v1/addEmp";

  constructor(private http: HttpClient) { }

  createEmp(emp: Emp): Observable<Emp> {
    let options = this.createHeaders();
    return this.http.post<Emp>(this.addEmpUri, emp, options);
  }

  createHeaders(){
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('MsgUid', new Date().getTime().toString());
    let options = {
      headers: httpHeaders
    };
    return options;
  }

  getAllEmployees(): Observable<Emp[]> {
    let options = this.createHeaders();
    return this.http.get<Emp[]>(this.getEmpUri,options);
  }
}
