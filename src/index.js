import React from 'react';
import Sound from 'react-sound';
import ReactDOM from 'react-dom';

import './index.css';


class GameArea extends React.Component {

    renderConditionMet(currentMap, buttonNumber){
        if(this.props.stepList[currentMap].steps[buttonNumber]!= null && this.props.stepList[currentMap].steps[buttonNumber].renderCondition === 'always'){
            return true;
        }
        if(this.props.stepList[currentMap].steps[buttonNumber]!= null && this.props.inventory.includes(this.props.stepList[currentMap].steps[buttonNumber].renderCondition)){
            return true;
        }
        return false;
    }

    renderButton(currentMap, buttonNumber){
        return this.props.stepList[currentMap].steps[buttonNumber] != null && this.renderConditionMet(currentMap, buttonNumber) ? (
            <button class="choice-button" 
                    onClick={() => this.props.onClick(this.props.stepList[currentMap].steps[buttonNumber].gotoStep, buttonNumber)}>
                {this.props.stepList[currentMap].steps[buttonNumber].decisionText}
            </button>
        ) : null;
    }

    
    

    render() {
        const currentEquipment = this.props.inventory.map( (item, move) => {
            return (
            <li key={move}>
                {item}
            </li>
            );
        });

        return (
            <div>
                <h4>{this.props.gameText}</h4>
                {this.renderButton(this.props.currentMap, 0)}
                {this.renderButton(this.props.currentMap, 1)}
                <p>Inventory</p>
                <ul class="list">
                    {currentEquipment}
                </ul>
                <Sound
                    url={process.env.PUBLIC_URL + '/assets/wind.mp3'}
                    playStatus={Sound.status.PLAYING}
                    onLoading={this.handleSongLoading}
                    onPlaying={this.handleSongPlaying}
                    onFinishedPlaying={this.handleSongFinishedPlaying}
                    loop={true}
    
                    />

                
            
            </div>
        );
    }
    
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          currentMap: -1,
          inventory: [],
          list: [
              { 
                "text" : "The lighthouse stands steadfast against the elements. It's lonely presence cuts through the darkness", 
                "id" : 0,
                "steps" : [
                    {
                        "decisionText" : "Approach the lighthouse",
                        "renderCondition" : "always",
                        "gotoStep" : 1
                    },
                    {
                        "decisionText" : "Peer over the cliffs",
                        "renderCondition" : "always",
                        "gotoStep" : 2  
                    }
                ]
             },
             { 
                "text" : "You approach the lighthouse", 
                "id" : 1,
                "steps" : [
                    {
                        "decisionText" : "Go inside",
                        "renderCondition" : "always",
                        "gotoStep" : 4
                    },
                    {
                        "decisionText" : "Leave",
                        "renderCondition" : "always",
                        "gotoStep" : 2  
                    }
                ]
             },
             { 
                "text" : "The waves smash against the rocks with dizzying force", 
                "id" : 2,
                "steps" : [
                    {
                        "decisionText" : "Go for a swim",
                        "renderCondition" : "always",
                        "gotoStep" : 3
                    },
                    {
                        "decisionText" : "Go back and approach the lighthouse",
                        "renderCondition" : "always",
                        "gotoStep" : 1  
                    }
                ]
             },
             { 
                "text" : "That was a silly thing to do.", 
                "id" : 3,
                "steps" : [
                    {
                        "decisionText" : "Start your journey again",
                        "renderCondition" : "always",
                        "gotoStep" : 0
                    }
                ]
             },
             { 
                "text" : "The wooden door creaks open, inside you see scattered belongings from whoever lived here last", 
                "id" : 4,
                "steps" : [
                    {
                        "decisionText" : "Search the belongings",
                        "renderCondition" : "always",
                        "newEquipment" : "kerosene",
                        "gotoStep" : 5
                    },
                    {
                        "decisionText" : "Go up the staircase",
                        "renderCondition" : "always",
                        "gotoStep" : 6
                    },
                ]
             },
             { 
                "text" : "You are standing on the bottom floor of the lighthouse, there doesnt seem to be anything worthwhile here", 
                "id" : 5,
                "steps" : [
                    {
                        "decisionText" : "Go up the staircase",
                        "renderCondition" : "always",
                        "gotoStep" : 6
                    }
                    
                ]
             },
             { 
                "text" : "As you ascend the staircase, you notice that there are windows looking out in to the darkness", 
                "id" : 6,
                "steps" : [
                   {
                       "decisionText" : "Look out the window",
                       "renderCondition" : "always",
                       "gotoStep" : 7
                   },
                   {
                        "decisionText" : "Ignore the window and continue your ascent",
                        "renderCondition" : "always",
                        "gotoStep" : 8
                   }
                   
               ]
            },
            { 
                "text" : "You look out the window and see a figure looking back at you", 
                "id" : 7,
                "steps" : [
                   {
                       "decisionText" : "RUN!",
                       "renderCondition" : "always",
                       "gotoStep" : 8
                   },
                   {
                        "decisionText" : "Reach out your hand",
                        "renderCondition" : "always",
                        "gotoStep" : 9
                   }
                   
               ]
            },
            { 
                "text" : "You reach the apex of the lighthouse. The wind is buffeting you. A single chair sits solitary against the structure containing the lamp, its incandescent glow drawing you in.", 
                "id" : 8,
                "steps" : [
                   {
                       "decisionText" : "Approach the lamps mechanism",
                       "renderCondition" : "always",
                       "gotoStep" : 10
                   },
                   {
                        "decisionText" : "Leave the lighthouse",
                        "renderCondition" : "always",
                        "gotoStep" : 11
                   }
                   
               ]
            },
            { 
                "text" : "The figure reaches its hand out and pulls you with immense force, the world goes dark around you, but maybe it always was", 
                "id" : 9,
                "steps" : [
                    {
                        "decisionText" : "Start your journey again",
                        "renderCondition" : "always",
                        "gotoStep" : 0
                    }
               ]
            },
            { 
                "text" : "You reach the mechanism. The gauges indicate the kerosene levels are low. The kind, warm glow of the lamps light comforts you, you should really keep it going.", 
                "id" : 10,
                "steps" : [
                   {
                       "decisionText" : "Use the kerosene to fuel the lamp",
                       "renderCondition" : "kerosene",
                       "gotoStep" : 12
                   },
                   {
                        "decisionText" : "Go back downstairs",
                        "renderCondition" : "always",
                        "gotoStep" : 4
                   }
                   
               ]
            },
            { 
                "text" : "You leave the lighthouse, wondering why you ever came...", 
                "id" : 11,
                "steps" : [
                    {
                        "decisionText" : "Start your journey again",
                        "renderCondition" : "always",
                        "gotoStep" : 0
                    }
                
               ]
            },
            { 
                "text" : "You pour the kerosene in to the resevoir and the lamp roars to life. The light belongs to you, it is your responsibility, but maybe some day the cycle can be broken. You take a seat on the chair and wait.", 
                "id" : 11,
                "steps" : [
                    {
                        "decisionText" : "Start your journey again",
                        "renderCondition" : "always",
                        "gotoStep" : 0
                    }
                   
               ]
            },
        
            ],
        };
      }

    handleClick(i, j) {
        const currentStep = this.state.currentMap;
        const nextStep = i;
        const inventory = this.state.inventory.slice();
        const newEquipment = this.state.list[currentStep].steps[j].newEquipment;
        if (newEquipment) {
            inventory.push(newEquipment);
        }
        this.setState({
            currentMap: nextStep,
            inventory: inventory
        });
        
    }

    generateGameArea(){
    
        return (
            <GameArea 
                gameText={this.state.list[this.state.currentMap].text} 
                stepList={this.state.list}
                currentMap={this.state.currentMap}
                onClick={(i, j) => this.handleClick(i, j)}
                inventory={this.state.inventory}
            />
        )
    }

    handleMyClick(){
        this.setState({
            currentMap: 0,
    
        } , () => this.generateGameArea());
    
        
    }

    

    render() {
        
        return (
           <div class="game-area">
            
            {this.state.currentMap >= 0 ? this.generateGameArea() : <button class="choice-button"
                    onClick={() => this.handleMyClick()}>
                Begin
            </button>}
            
           </div>
           
        );
    }

    
}
  
ReactDOM.render(
<Game />,
document.getElementById('root')

);
  