import React from 'react';
import './css/app.css';

class Letmedecide extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      options: [],
      pickone: 0
    };
    this.handleAddOption = this.handleAddOption.bind(this);
    this.removeAll = this.removeAll.bind(this);
    this.pickOne = this.pickOne.bind(this);
    this.removeOption = this.removeOption.bind(this);
  }

  removeOption(rmstring){
    var tempobj = this.state.options;
    tempobj.splice(this.state.options.indexOf(rmstring),1);
    this.setState((prevState) => {
      return {
        options: tempobj
      }
    });
  }

  handleAddOption(string){
    if(!string){
      return "Enter Text";
    }else if(this.state.options.indexOf(string) >= 0){
      return "Option Already Exists";
    }

    this.setState((prevState)=>{
      return {
        options:  prevState.options.concat([string])
      };
    });
  }

  removeAll(){
    this.setState({
      options: []
    })
  }

  pickOne(){
    const random = Math.floor(Math.random()*this.state.options.length);
    this.setState({
      pickone: random
    });
  }
  

  render(){
    return(
      <div>
        <Header />
        <Action disable={this.state.options.length > 1} pickone={this.pickOne} />
        <div className="row justify-content-center align-items-center options">
          <div className="col-md-8 col-xs-6">
            <p>
              <Options disable={this.state.options.length > 0} options={this.state.options} remove={this.removeOption} clear={this.removeAll}/>
              <AddOption handleAdd={this.handleAddOption}/>
            </p>
          </div>
        </div>
        <div className="modal fade" id="displayoption" tabindex="-1" role="dialog" aria-labelledby="heading" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="heading">Choosed Decision</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p Style="text-align: center; font-size: 25px; text-transform: capitalize;">{this.state.options[this.state.pickone]}</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );

  }
}

class Header extends React.Component{
  render(){
    return(
      <header className="row">
        <div className="col-md-12">
          <h1>Let Me Decide</h1>
          <p>Confused in Making Decisions? Push your options to randomly decide!</p>
        </div>
      </header>
    );
  }
}

class Action extends React.Component{
  render(){
    return(
      <div className="row justify-content-center">
        <div className="col-md-8 col-xs-12">
          <p Style="padding: 10px;"><button data-toggle="modal" data-target="#displayoption" className="btn btn-lg btn-block btn-success" disabled={!this.props.disable} onClick={this.props.pickone}>Pick one for Me!</button></p>
        </div>
      </div>
    );
  }
}

class Options extends React.Component{
  render(){
    return(
      <div>
        <h2>Options</h2>
        <button disabled={!this.props.disable} class="btn btn-outline-danger" onClick={this.props.clear}>Remove All</button>
        <ol className="list-group">
          {this.props.options.map((options) => <Option key={options} remove={this.props.remove} option={options} />)}
        </ol>
      </div>
    );
  }
}

class Option extends React.Component{
  constructor(props){
    super(props);
    this.handleRemoveElement = this.handleRemoveElement.bind(this);
  }

  handleRemoveElement(){
    var text = this.props.option;
    this.props.remove(text);
  }

  render(){
    return(
      <li className="list-group-item d-flex justify-content-between align-items-center">{this.props.option}<span className="badge"><button className="btn btn-outline-danger" onClick={this.handleRemoveElement}>Remove</button></span></li>
    );
  }
}

class AddOption extends React.Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
    this.state ={
      temptxt: ""
    };
  }

  handleChange(e){
    this.setState({
      temptxt: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const error = this.props.handleAdd(this.state.temptxt);
    this.setState({temptxt: ""});
    if(error){
      alert(error);
    }
  }

  render(){
    return(
      <form className="input-group" onSubmit={this.handleSubmit}>
        <input class="form-control" placeholder="Enter your options!" type="text" value={this.state.temptxt} name="option" onChange={this.handleChange}></input>
        <span className="input-group-btn">
          <button className="btn btn-success" onClick={this.handleSubmit}>Add</button>
        </span>
      </form>
    );
  }
}

class Footer extends React.Component{
  render(){
    return(
      <div className="row">
        <div className="col-md-12">
          <p Style="text-align: center;">Developed by Sudarsan T J</p>
        </div>
      </div>
    );
  }
}

export default Letmedecide;