import { ChangeDetectionStrategy, Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, TableComponent } from '@solarwinds/nova-bits';
import { AddRemoveTableColumnsModel } from '../../models/AddRemoveTableColumns';

const ELEMENT_DATA: AddRemoveTableColumnsModel[] = [
  {
      issue: 'NUI-111',
      project: 'Nova NUI',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: 'In Progress',
      epic: 'Table Component',
      assignee: 'Alex',
      reporter: 'Maria',
      actions: 'Some custom date here',
  },
  {
      issue: 'NUI-222',
      project: 'Nova NUI',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit.',
      status: 'In Progress',
      epic: 'Table Component',
      assignee: 'Maria',
      reporter: 'Peter',
      actions: 'Some custom date here',
  },
  {
      issue: 'NUI-333',
      project: 'Nova NUI',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      status: 'In Progress',
      epic: 'Table Component',
      assignee: 'John',
      reporter: 'Rob',
      actions: 'Some custom date here',
  },
  {
      issue: 'NUI-444',
      project: 'Nova NUI',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      status: 'Done',
      epic: 'Textbox Component',
      assignee: 'Alberto',
      reporter: 'Emma',
      actions: 'Some custom date here',
  },
  {
      issue: 'NUI-555',
      project: 'Nova NUI',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      status: 'Open',
      epic: 'Textbox Component',
      assignee: 'Rob',
      reporter: 'Emma',
      actions: 'Some custom date here',
  },
  {
      issue: 'NUI-666',
      project: 'Nova NUI',
      description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
      status: 'Open',
      epic: 'Textbox Component',
      assignee: 'Maria',
      reporter: 'Emma',
      actions: 'Some custom date here',
  },
  {
      issue: 'NUI-777',
      project: 'Nova NUI',
      description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.',
      status: 'Done',
      epic: 'Textbox Component',
      assignee: 'Divock',
      reporter: 'Harry',
      actions: 'Some custom date here',
  },
  {
      issue: 'NUI-888',
      project: 'Nova NUI',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.',
      status: 'Open',
      epic: 'Radio Component',
      assignee: 'Abdula',
      reporter: 'Harry',
      actions: 'Some custom date here',
  },
  {
      issue: 'NUI-999',
      project: 'Nova NUI',
      description: 'Quis autem vel eum iure reprehenderit qui in ea voluptate.',
      status: 'Open',
      epic: 'Radio Component',
      assignee: 'Colin',
      reporter: 'Maria',
      actions: 'Some custom date here',
  },
  {
      issue: 'NUI-1000',
      project: 'Nova NUI',
      description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.',
      status: 'In Progress',
      epic: 'Radio Component',
      assignee: 'Maria',
      reporter: 'Rob',
      actions: 'Some custom date here',
  },
];

const rowToAddToStart: AddRemoveTableColumnsModel = {
  issue: 'NUI-100',
  project: 'Nova NUI',
  description: 'This row is added to the beginning',
  status: 'New status',
  epic: 'Radio Component',
  assignee: 'Maria',
  reporter: 'Rob',
  actions: 'Some custom date here',
};

const rowToAddToEnd: AddRemoveTableColumnsModel = {
  issue: 'NUI-1100',
  project: 'Nova NUI',
  description: 'This row is added',
  status: 'New status',
  epic: 'Radio Component',
  assignee: 'Maria',
  reporter: 'Rob',
  actions: 'Some custom date here',
};

@Component({
  selector: 'app-all-alerts-table',
  templateUrl: './all-alerts-table.component.html',
  styleUrls: ['./all-alerts-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllAlertsTableComponent implements OnInit {
  public myForm: FormGroup;
  public availableColumns = ['issue', 'project', 'description', 'status', 'epic', 'assignee', 'reporter', 'actions'];
  public displayedColumns = ['issue', 'project', 'description', 'status', 'actions'];
  // full copy of displayed columns added to update columns only when updateTable() is called
  public displayedColumnsCopy = this.displayedColumns.slice();
  public newColumn: string;
  public dataSource = ELEMENT_DATA;
  @ViewChild(TableComponent) table: TableComponent<AddRemoveTableColumnsModel>;

  constructor(@Inject(DialogService) private dialogService: DialogService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
      this.myForm = this.formBuilder.group({
          checkboxGroup: this.formBuilder.control(this.displayedColumnsCopy, [
              Validators.required, Validators.minLength(3)]),
      });
  }

  public columnsChanged(columns: any): void {
      this.displayedColumnsCopy = columns;
  }

  public isChecked(vegetable: string): boolean {
      return this.displayedColumnsCopy.indexOf(vegetable) > -1;
  }

  public open(content: TemplateRef<string>): void {
      this.dialogService.open(content, {size: 'sm'});
  }

  public updateNewColumnValue(event: any): void {
      this.newColumn = event;
  }

  public addNewColumn(): void {
      if (this.newColumn) {
          this.availableColumns.push(this.newColumn);
          this.displayedColumnsCopy.push(this.newColumn);
          this.newColumn = '';
      }
  }

  public updateColumns(): void {
      this.displayedColumns = this.displayedColumnsCopy.slice();
  }

  public columnIsActions(column: string) {
      return column === 'actions';
  }

  public deleteRow(row: AddRemoveTableColumnsModel) {
      this.dataSource.splice(this.dataSource.indexOf(row, 0), 1);
      this.table.renderRows();
  }

  public appendRow() {
      this.dataSource.splice(this.dataSource.length, 0, rowToAddToEnd);
      this.table.renderRows();
  }

  public prependRow() {
      this.dataSource.splice(0, 0, rowToAddToStart);
      this.table.renderRows();
  }
  // ngOnInit() {
  // }

}
