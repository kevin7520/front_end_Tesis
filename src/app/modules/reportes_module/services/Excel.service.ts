// excel.service.ts
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  exportAsExcelFile(json: any[], excelFileName: string): void {
    const flatJson = json.map(item => this.flatten(item));
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(flatJson);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  private flatten(obj: any, parent?: string, res: any = {}, indexMap: any = {}): any {
    for (const key in obj) {
      const newKey = parent ? parent + '.' + key : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        this.flatten(obj[key], newKey, res, indexMap);
      } else if (Array.isArray(obj[key])) {
        obj[key].forEach((item: any, index: any) => {
          this.flatten(item, `${newKey}[${index}]`, res, indexMap);
        });
      } else {
        if (res[newKey] !== undefined) {
          if (!indexMap[newKey]) {
            indexMap[newKey] = 1;
          }
          res[`${newKey}_${indexMap[newKey]}`] = obj[key];
          indexMap[newKey]++;
        } else {
          res[newKey] = obj[key];
        }
      }
    }
    return res;
  }
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
