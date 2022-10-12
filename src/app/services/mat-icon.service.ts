import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MatIconService {
  constructor(private _matIconRegistry: MatIconRegistry, private _sanitizer: DomSanitizer) {}

  addSvgIconLiteral(iconName: string, safeHtmlString: string) {
    this._matIconRegistry.addSvgIconLiteral(
      iconName,
      this._sanitizer.bypassSecurityTrustHtml(safeHtmlString)
    );
  }
}
