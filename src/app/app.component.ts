import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent, FirstDataRenderedEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'music';

  songs = [
    {
      id: 0,
      name: '',
      band: ''
    }
  ]

  ngOnInit() {
    fetch("list_songs.php")
    .then((response) => response.json())
    .then((data) => {
      this.songs = data
    });
  }

  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(private modalService: MdbModalService, private http: HttpClient) {}

  openModal() {
    this.modalRef = this.modalService.open(ModalComponent)
  }

  showLyrics(value: any) {
    const songId = value.data.id;
    fetch('list_lyrics.php?id='+songId)
    .then((response) => response.json())
    .then((data) => {
      const songData = data;
      this.modalRef = this.modalService.open(ModalComponent, {
        data: {
          title: songData[0].name,
          lyrics: songData[0].lyrics,
          bandSinger: songData[0].band,
          copyRight: songData[0].copyright
        },
      });
    });
  }

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { headerName: 'Song Name', field: 'name'},
    { headerName: 'Band/Singer Name', field: 'band'}
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  // Data that gets displayed in the grid
  public rowData$!: Observable<any[]>;

  public rowSelection: 'single' | 'multiple' = 'multiple';

  //Load data from the server
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.http
      .get<any[]>('list_songs.php')
  }

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

}
