import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TickerData } from 'src/app/core/models/stocks.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit, OnInit {
  dataSource;
  displayedColumns: string[] = ['ticker', 'value', 'position', 'pl', 'totalPL'];

  @Input() data: TickerData[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource = new MatTableDataSource<TickerData>(this.data);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
