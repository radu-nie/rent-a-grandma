import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';

import { MatPaginator, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';



@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns: string[] = ['id', 'username', 'firstName', 'lastName', 'action'];
    dataSource = new MatTableDataSource<User>([]);

    currentUser: User;
    users: User[] = [];


    constructor(private userService: UserService, public dialog: MatDialog) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
        this.dataSource.paginator = this.paginator;
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
            this.dataSource = new MatTableDataSource<User>(users);
        });
    }


}

