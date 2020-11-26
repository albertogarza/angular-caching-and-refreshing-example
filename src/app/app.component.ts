import { HttpClient } from "@angular/common/http";
import { Component, VERSION } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { timer } from "rxjs";
import { shareReplay,  switchMap, tap } from "rxjs/operators";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular and RxJS Caching and Refreshing Example";

  videos$;

  constructor(private http: HttpClient, public sanitizer: DomSanitizer) {
    this.videos$ = timer(0, 60 * 60 * 1000).pipe(
      switchMap(() => this.http.get("https://www.scorebat.com/video-api/v1/")),
      shareReplay(1),
      tap(console.log)
    );
  }
}
