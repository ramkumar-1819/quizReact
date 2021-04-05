import React, { Component } from 'react';
import axios from 'axios';
import './Quiz.css'
import Result from '../ResultComponent/ResultComponent';

var x;
var attempted={};
class Quiz extends React.Component{
    constructor(){
        super();
        this.state={
                   list:[],
                   timer:120,
                   i:0,
                   initial:120,
                   isrender:"quiz"
                }
    }
    componentDidMount(){
            axios.get("https://my-json-server.typicode.com/Naveen132895/quiz-api/questions")
                .then(res=>res.data)
                .then(res=>{this.setState({list:res})})
                .catch(err=>console.log(err))
                this.intervalId = setInterval(this.timer, 1000);
            }
    timer=()=> { 
        if(this.state.initial-this.state.timer===10 && this.state.i<this.state.list.length){
            this.setState({i:this.state.i+1,
                initial:this.state.timer,
                timer:this.state.timer - 1})
        }
        else if (this.state.timer < 1) {
             clearInterval(this.intervalId);
        }
        else{
            this.setState({timer: this.state.timer - 1})
            }
        }
    quit=()=>{
        this.setState({isrender:"result"})
    }
    previous=()=>{
        if(this.state.i===0){
            alert("This is the First Question")
        }
        else{
            this.setState({initial:this.state.timer,
                           i:this.state.i-1})
        }
    }
    next=()=>{
        if(this.state.i+1===this.state.list.length){
            alert("Quiz is fininshed")
            this.setState({isrender:"result"})
        }
        else{
            this.setState({initial:this.state.timer,
                i:this.state.i+1})
        }
    }
    nextquestion=(e,option)=>{ 
        x=this.state.isrender
        console.log(this.state.list[this.state.i].answer)
        if(this.state.list[this.state.i].answer===e.target.innerHTML){
                attempted[this.state.i+1]=[option,"correct"];
                document.getElementsByClassName("option")[option].style.backgroundColor="green";
                if(this.state.i+1===this.state.list.length){
                     x="result"
                }
                setTimeout(()=>{this.setState({
                i:this.state.i+1,
                initial:this.state.timer,
                isrender:x})},1000)
            }
        else{
            attempted[this.state.i+1]=[option,"wrong"];
            if(this.state.i+1===this.state.list.length){
                x="result"
           }
            document.getElementsByClassName("option")[option].style.backgroundColor="red";
            setTimeout(()=>{this.setState({
                i:this.state.i+1,
                initial:this.state.timer,
                isrender:x})
                },1000)
            }
        
    }
    render(){
        console.log(this.state)
        if(this.state.i>0 && this.state.i<this.state.list.length && this.state.isrender==="quiz"){
            document.querySelectorAll(".option")[0].style.backgroundColor="blue";
            document.querySelectorAll(".option")[1].style.backgroundColor="blue"
            document.querySelectorAll(".option")[2].style.backgroundColor="blue"
            document.querySelectorAll(".option")[3].style.backgroundColor="blue"
        }
        var x=this.state.i;
    return(
           <>
           { (this.state.list.length>0 && x<this.state.list.length && this.state.isrender==="quiz")&&
               <div className="main">
                    <div>Questions</div>
                    <div className="question">
                        <div>{x+1} of 10</div>
                        <div>{this.state.list[x].question}</div>
                        <div id="timer">{this.state.timer}</div>
                    </div>
                <div className="answers">
                    <button className="option" onClick={(e)=>this.nextquestion(e,0)}>{this.state.list[x].options[0]}</button>
                    <button className="option" onClick={(e)=>this.nextquestion(e,1)}>{this.state.list[x].options[1]}</button>
                    <button className="option" onClick={(e)=>this.nextquestion(e,2)}>{this.state.list[x].options[2]}</button>
                    <button className="option" onClick={(e)=>this.nextquestion(e,3)}>{this.state.list[x].options[3]}</button>
                </div>
                <div className="buttons">
                    <button onClick={this.previous}>Previous</button>
                    <button onClick={this.next}>Next</button>
                    <button onClick={this.quit}>Quit</button>
                </div>
               </div>
           }
           {( this.state.isrender==="result") &&
             <>
             <Result marks={attempted}/>
             </>
           }
           </>
           )
    }
}
export default Quiz
