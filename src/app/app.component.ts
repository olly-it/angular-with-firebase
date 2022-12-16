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
  onNew() {
    console.log('onNew function invoked');
    try {
      addDoc(collection(db, 'users'), {
        name: 'Alessio.' + Math.trunc(Math.random() * 10000),
        born: 1982,
        creationDate: new Date(),
      }).then((x) => {
        console.log('Document written with ID: ', x.id);
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    this.getAll();
  }

  getAll() {
    this.all = [];
    console.log('getAll function invoked');
    getDocs(collection(db, 'users')).then((querySnapshot) =>
      querySnapshot.forEach((doc) => {
        this.all.push({ id: doc.id, data: JSON.stringify(doc.data()) });
      })
    );
    return 'ok';
  }

  del(id: string) {
    deleteDoc(doc(db, 'users', id));
    this.getAll();
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
