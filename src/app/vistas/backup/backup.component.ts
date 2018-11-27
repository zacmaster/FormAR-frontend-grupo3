import { Component, OnInit,DoCheck } from '@angular/core';
import { BackupService } from 'src/app/servicios/backup.service';
import { GLOBAL } from 'src/app/servicios/global';
import { FileUpload } from 'primeng/primeng';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent implements OnInit {

  urlPostBD:string;
  file:File;

  constructor(private _backupService: BackupService) { }

  ngOnInit() {
    this.urlPostBD= "http://localhost:3000/v1/backup";
  }
  ngDoCheck(){
    console.log("archivo",this.file);
    
  }

  getBackupDB(){
    this._backupService.getBD().
    subscribe(res => {
      console.log('start download:',res);
      var url = window.URL.createObjectURL(res);
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = "Backup-"+new Date().toLocaleDateString('en-GB')+".sql";
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove(); // remove the element
    })  
  }
myUploader(event) {
 console.log(event);
 this.file=event.files[0];
 this._backupService.uploadFile(this.file).catch(e=>{
   event.files.pop();
 })

}





}
