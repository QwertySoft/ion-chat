import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChatPage } from './chat.page';
import { UserResolver } from 'src/app/resolvers/user.resolver';

const routes: Routes = [
  {
    path: ':user',
    component: ChatPage,
    resolve: { user: UserResolver }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChatPage],
  providers: [UserResolver]
})
export class ChatPageModule {}
