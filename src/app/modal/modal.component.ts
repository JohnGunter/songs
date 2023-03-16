import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  title: string | null = null;
  songName: string | null = null;
  lyrics: string | null = null;
  bandSinger: string | null = null;
  copyRight: string | null = null;

  constructor(public modalRef: MdbModalRef<ModalComponent>) {}
}