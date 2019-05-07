import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <form action="/api/uploadImage" encType="multipart/form-data" method="POST">
          <input type="file" name="myImage" accept="image/*"/>
          <input type="submit" value="Upload Photo"/>
        </form>
      </div>
    );
  }
}
export default App;
