import React, { Component } from 'react';
import './App.css';
import { Display } from './components/display';
import { Controls } from './components/controls';
import accurateInterval from './utilities/accurateInterval';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerType: 'Session',
      timeLeft: 1500,
      intervalID: '',
      isRunning: false,
      buttonStyle: 'fa fa-play fa-2x'
    }
    this.reset = this.reset.bind(this);
    this.handleBreak = this.handleBreak.bind(this);
    this.handleSession = this.handleSession.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.startCountdown = this.startCountdown.bind(this);
    this.countdown = this.countdown.bind(this);
    this.control = this.control.bind(this);
    this.alarm = this.alarm.bind(this);
  }

  reset() {
    this.state.intervalID && this.state.intervalID.cancel();
    this.beepSound.pause();
    this.beepSound.currentTime = 0;
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timerType: 'Session',
      timeLeft: 1500,
      intervalID: '',
      isRunning: false,
      buttonStyle: 'fa fa-play fa-2x'
    })
  }

  handleBreak(e){
    let event = e.currentTarget.value;
    this.handleLengthChange(event, 'breakLength')
  }

  handleSession(e){
    let event = e.currentTarget.value;
    this.handleLengthChange(event, 'sessionLength');
  }

  handleLengthChange(event, stateToChange){
    if (event === '+' && this.state[stateToChange] < 60) {
      this.setState( prevState => ({
        [stateToChange]: prevState[stateToChange] + 1,
        timeLeft: stateToChange === 'sessionLength' ?
          prevState.timeLeft + 60 : prevState.timeLeft
      }))
    } else if (event === '-' && this.state[stateToChange] > 1) {
      this.setState( prevState => ({
        [stateToChange]: prevState[stateToChange] - 1,
          timeLeft: stateToChange === 'sessionLength' ?
          prevState.timeLeft - 60 : prevState.timeLeft
      }))
    }
  }

  handleTimer(){
    const { isRunning, intervalID } = this.state;
    isRunning ? intervalID && intervalID.cancel() : this.startCountdown();
    this.setState( prevState => ({
      isRunning: !prevState.isRunning,
      buttonStyle: prevState.isRunning ? 'fa fa-play fa-2x' : 'fa fa-pause fa-2x'
    }))
  }

  startCountdown(){
    this.setState({
      intervalID: accurateInterval( () => {
        this.countdown();
        this.control();
      }, 1000)
    })
  }

  countdown(){
    this.setState( prevState => ({ timeLeft: prevState.timeLeft - 1 }))
  }

  control(){
    const { timeLeft, intervalID, timerType } = this.state;
    this.alarm();
    if (timeLeft < 0){
      intervalID.cancel();
      if (timerType === 'Session') {
        this.setState( prevState => ({
          timeLeft: prevState.breakLength * 60,
          timerType: 'Break'
        }))
      } else {
        this.setState( prevState => ({
          timeLeft: prevState.sessionLength * 60,
          timerType: 'Session'
        }))
      }
      this.startCountdown();
    }
  }

  alarm(){
    if (this.state.timeLeft === 0) {
      this.beepSound.currentTime = 0;
      this.beepSound.play();
    }
  }

  render(){
    return(
      <div className='clock-container'>
        <Controls
          titleID='break-label'
          titleValue='Break Length'
          buttonDown='break-decrement'
          buttonUp='break-increment'
          lengthID='break-length'
          breakLength={this.state.breakLength}
          onClick={this.handleBreak}/>
        <div className='display-container'>
          <Display
            timeLeft={this.state.timeLeft}
            timerType={this.state.timerType}/>
          <button id='start_stop' onClick={this.handleTimer}><i className={this.state.buttonStyle}></i></button>
          <button id='reset' onClick={this.reset}><i className="fas fa-sync-alt fa-2x"></i></button>
          <audio
            id='beep'
            src='https://goo.gl/65cBl1'
            ref={(audio) => {this.beepSound = audio}}/>
        </div>
        <Controls
          titleID='session-label'
          titleValue='Session Length'
          buttonDown='session-decrement'
          buttonUp='session-increment'
          lengthID='session-length'
          breakLength={this.state.sessionLength}
          onClick={this.handleSession}/>

      </div>
    )
  }
}


export default App;
