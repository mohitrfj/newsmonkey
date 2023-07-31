import './App.css';
import React, { Component } from 'react'
import News from './components/News';
import NavBar from './components/NavBar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  state ={
      progress:0
  }

  apikey=process.env.REACT_APP_API_KEY

  setProgress = (progress) => {
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
        <NavBar />
        <Routes>
        <Route exact path='/' element={<News  setProgress={this.setProgress} apikey={this.apikey}   key="general" pageSize={8} country="in" category="general"/>} />
        <Route exact path='business' element={<News  setProgress={this.setProgress} apikey={this.apikey}  key="business" pageSize={8} country="in" category="business"/>} />
        
        <Route exact path='entertainment' element={<News  setProgress={this.setProgress} apikey={this.apikey}  key="entertainment" pageSize={8} country="in" category="entertainment"/>}/>
        
        <Route exact path='general' element={<News  setProgress={this.setProgress} apikey={this.apikey}  key="general2" pageSize={8} country="in" category="general"/>} />
        
        <Route exact path='health' element={<News  setProgress={this.setProgress} apikey={this.apikey}  key="health" pageSize={8} country="in" category="health"/>} />
        
        <Route exact path='science' element={<News  setProgress={this.setProgress} apikey={this.apikey}  key="science" pageSize={8} country="in" category="science"/>} />
        
        <Route exact path='sports' element={<News  setProgress={this.setProgress} apikey={this.apikey}  key="sports" pageSize={8} country="in" category="sports"/>} />
       
        <Route exact path='technology' element={<News  setProgress={this.setProgress} apikey={this.apikey}  key="technology" pageSize={8} country="in" category="technology"/>} />

        {/* using key as we need to remount our news component after clicking on the options but if we dont give a key react will pass only categories props without remounting and rerendering the new News component. */}

        </Routes>
        </Router>
      </div>
    )
  }
}