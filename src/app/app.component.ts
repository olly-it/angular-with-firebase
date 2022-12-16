import { getLocaleCurrencyCode } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-with-firebase';
  all: any = [];
  onAdd(addName: string) {
    console.log('onAdd function invoked');
    if (addName == '') return;
    try {
      const now = new Date();
      addDoc(collection(db, 'users'), {
        name: addName + '.' + Math.trunc(Math.random() * 10000),
        born: Math.trunc(now.getFullYear() - Math.random() * 100),
        creationDate: now.toISOString(),
      }).then((x) => {
        console.log('Document written with ID: ', x.id);
        this.getAll();
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  getAll() {
    this.all = [];
    console.log('getAll function invoked');
    getDocs(collection(db, 'users')).then((querySnapshot) =>
      querySnapshot.forEach((doc) => {
        this.all.push({ id: doc.id, data: JSON.stringify(doc.data()) });
      })
    );
  }

  del(id: string) {
    deleteDoc(doc(db, 'users', id)).then(() => {
      this.getAll();
    });
  }

  constructor() {
    this.getAll();
  }
}

// ***********************
// * firebase stuff here *
// ***********************
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import firebaseConfig from '../../firebaseConfig.json';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// MOVED TO firebaseConfig.json - put there your firebaseConfigs, taken from firebase console website
/*const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};*/

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
