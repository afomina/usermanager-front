import {Observable, Subscriber} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class FileService {

  base64(file: File): Observable<string> {
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    return new Observable((observer: Subscriber<string>): void => {
      fileReader.onload = function () {
        if (typeof this.result === "string") {
          observer.next(btoa(this.result));
        }
        observer.complete();
      }
    });
  }

}
