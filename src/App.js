import React from 'react';
import LightningTalk from './components/lightning-talk-component.js';
import Form from './components/form.js';
import Login from './components/login.js';
import './App.css'


// initialized state of App to hold an empty lightningTalks compoennt. componentDidMount sets its state depends
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightningTalks: [],
      username: "",
      loggedIn: false
    };
  }

// componentDidMount is called and sets the state of the lightningTalks array in constructor(props)
  componentDidMount = () => {
    fetch("http://localhost:4000/talks.json")
    .then(response => response.json())
    .then((data) => {
      // sorts the data when component mounts from largest to smallest votes
      data.sort((a, b) => b.votes - a.votes)
      this.setState((state) => {
        return {
          lightningTalks: data
        };
      });
    });
  }

// sends a post request to the API
  postInApp = (titleDescription) => {
    const talk = {}
    talk.title = titleDescription.title
    talk.description = titleDescription.description
    talk.votes = 0

      fetch("http://localhost:4000/talks", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ "talk": talk })
        })
      .then(response => response.json())
      .then((data) => {
         console.log(data);
      });
  }

  login = (username) => {
    this.setState({
      loggedIn: true,
      username: username
    });
    console.log(this.state.username)
  }

// increments/decrements the votes in an object of lightningTalks
  incrementInApp = (id) => {
    // creates a new array based off current state of lightningTalks
    const nextLightningTalks = this.state.lightningTalks.map((currentLightningTalk) => {
      // if the id in the parameters equals the id of the current objects ID then place back into the array
      if (currentLightningTalk.id !== id) {
        return currentLightningTalk
      }
      // whatever remains (the one whose ID does match), += 1 votes of that object
        const nextLightningTalk = {...currentLightningTalk, votes: currentLightningTalk.votes + 1,
        };
    return nextLightningTalk
    })
    // sorts when number of votes increases
    nextLightningTalks.sort((a, b) => b.votes - a.votes)
// set new state of lightningTalks to equal the result of the new array above (the .map)
  this.setState({lightningTalks: nextLightningTalks})
  }

  decrementInApp = (id) => {
    const nextLightningTalks = this.state.lightningTalks.map((currentLightningTalk) => {
      if (currentLightningTalk.id !== id) {
        return currentLightningTalk
      }
        const nextLightningTalk = {...currentLightningTalk, votes: currentLightningTalk.votes - 1,
        };
    return nextLightningTalk
    })
     // sorts when number of votes decreases
    nextLightningTalks.sort((a, b) => b.votes - a.votes)

  this.setState({lightningTalks: nextLightningTalks})
  }

  showTalksAndForm(props) {

  }

  // now the state of lightning talks depends on what is on the API. Below there is a loop(.map) which is set by componentDidMount
  render() {

    return (
      <div className="container">
        <h1>Lightning Talks!</h1>
          <Login login={this.login}/>
            <div className="talks">
              {this.state.lightningTalks.votes}
                {this.state.lightningTalks.map((talk) => {
                  return <LightningTalk lightningTalk={talk} incrementInApp={this.incrementInApp} decrementInApp={this.decrementInApp}/>
                })}
            </div>
          <h3 className="form-header"> Submit your talk</h3>
        <Form postInApp={this.postInApp}/>
      </div>
    )
  }
}

export default App;
