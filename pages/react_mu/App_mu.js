import  ReactDOM from 'react-dom';
import React, { Component } from 'react';
//import './App.css';
import  {Dialog,MuiThemeProvider} from './material-ui';///styles/MuiThemeProvider';
import {Divider, Button,TextField, Popover,Menu,MenuItem,Toolbar} from './material-ui';
//import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
//import { Table, TableBody, TableHeader, TableCell, TableRow, TableCell } from 'material-ui/Table';
import {List,ListItem,ListItemIcon,ListItemText, Radio, Grid, RadioGroup,FormControl, FormLabel, FormControlLabel,withStyles,Typography, Table, TableBody, TableHead, TableCell, TableRow } from './material-ui';
import Client from './Client';
//import DialogExampleSimple from "./DialogExampleSimple"
//import DialogImportStandard from "./DialogImportStandard"
import ContactEdit from "./ContactEdit"
import update from 'immutability-helper';
//injectTapEventPlugin();
//var user = "";
var io = require("socket.io-client");
var socket=io('http://localhost:8000');
class App extends React.Component {
  mystate = {
    start:0,
    limit:10,
    total:0,
    baoxiang:"",
    logined: false,
    search:""
  }
  state = {
    anchorOriginVertical: 'bottom',
    anchorOriginHorizontal: 'center',
    transformOriginVertical: 'top',
    transformOriginHorizontal: 'center',
    open:false,
    contacts: [],
    user: "AnonymousUser",
    start:0,
    total:0,
    search:"",
    baoxiang:"",
    start_input:1,
    currentIndex:null,
    connect_error:false,
    anchorEl: null
  }

  componentDidMount=() => {
    socket.on("connect_error",()=>{
      this.setState({connect_error:true});
    })
    socket.on("connect",()=>{
      this.setState({connect_error:false});
    })
    this.load_data();
  }
  load_data=()=>{
    socket.emit("/get/Contact",
      { start:this.mystate.start,
        limit:this.mystate.limit,
        search:this.mystate.search,
        baoxiang:this.mystate.baoxiang,
      }, 
      (contacts) => {
        var user=contacts.user;
        if(user===undefined){
          user="AnonymousUser"
        }
        this.mystate.total=contacts.total;//because async ,mystate set must before state;
        this.setState({
          contacts: contacts.data, //.slice(0, MATCHING_ITEM_LIMIT),
          user: user,
          total:contacts.total,
          start:this.mystate.start
        });
    });
  };
  // removeFoodItem = (itemIndex) => {
  //   const filteredFoods = this.state.selectedFoods.filter(
  //     (item, idx) => itemIndex !== idx,
  //   );
  //   this.setState({ selectedFoods: filteredFoods });
  // }

  // addFood = (food) => {
  //   const newFoods = this.state.selectedFoods.concat(food);
  //   this.setState({ selectedFoods: newFoods });
  // }

  handleTest = () => {
    //const contact2=update(this.state.contacts[this.state.selected],{baoxiang: {$set: "test"}});
    // console.log("handleTest");
    //console.log(contact2);
    //var one=this.state.contacts[this.state.selected];
    var idx=this.state.selected;
    console.log(idx);
    const contacts2=update(this.state.contacts,{[idx]: {baoxiang:{$set:"test111"}}});
    console.log(contacts2);
    //this.state.contacts[this.state.selected].baoxiang="test";
    this.setState({contacts:contacts2});
    //this.forceUpdate();
  };
  handleContactChange = (idx,contact) => {
    console.log(idx);
    const contacts2=update(this.state.contacts,{[idx]: {$set:contact}});
    console.log(contacts2);
    this.setState({contacts:contacts2});
  };
  oncontactClick=(key) => {
    console.log("click row");
    console.log(key);
    this.setState({selected:key});
  };
  handleImportStandard=() => {
    console.log("import row");
  };
  handleUserChange = (user) => {
    if (user === "AnonymousUser") {
      this.setState({
        logined: false
      });
    } else {
      this.setState({
        logined: true
      });
    }
    this.setState({
      user: user,
      contacts: [], //slice(0, MATCHING_ITEM_LIMIT),
    });
    this.componentDidMount();
  };
  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };
  showlogin = () => {
    console.log("showlogin");
    var data = {
      username: "mahongquan",
      password: "333333"
    };
    this.onLoginSubmit(data);
  };
  handleLogin = () => {
    console.log("login");
    Client.login_index((data) => {
      //console.log(data.csrf_token);
      // const cookies = new Cookies();

      // cookies.set('csrftoken', this.state.csrf_token, { path: '/' });
      this.showlogin();
    });

  };
  handleLogout = () => {
    console.log("logout");
    Client.logout((data) => {
      console.log("logout" + data);
      this.setState({
        logined: false,
        user: "AnonymousUser",
      });
      this.handleUserChange(this.state.user);
    });
  };
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };
  handleSearchChange = (e) => {
    const value = e.target.value;

    this.setState({
      searchValue: value,
    });

    if (value === '') {
      this.setState({
        contacts: [],
        showRemoveIcon: false,
      });
    } else {
      this.setState({
        showRemoveIcon: true,
      });

      socket.emit("/get/Contact",{search:value}, (contacts) => {
        this.setState({
          contacts: contacts.data, //.slice(0, MATCHING_ITEM_LIMIT),
        });
      });
    }
  };
  onLoginSubmit= (data) => {
    console.log(data);
    Client.login(data.username, data.password, (res) => {
      if (res.success) {
        this.setState({
          logined: true,
        });
        this.setState({
          user: data.username
        });
        this.handleUserChange(this.state.user);
      }
    });
  };
  inputChange=(e)=>{
    console.log(this.refs.input);
    console.log(this.refs.style);
    var style=getComputedStyle(this.refs.input, null)
    console.log(style);
    this.setState({test_input:e.target.value});
  };
  handleSearchChange = (e) => {
    this.mystate.search=e.target.value;
    this.setState({search:this.mystate.search});
  };
  handlePrev = (e) => {
    this.mystate.start=this.mystate.start-this.mystate.limit;
    if(this.mystate.start<0) {this.mystate.start=0;}
    this.load_data();
  };
  search = (e) => {
    this.mystate.start=0;
    this.load_data();
  };
  jump=()=>{
    this.mystate.start=parseInt(this.state.start_input,10)-1;
    if(this.mystate.start>this.mystate.total-this.mystate.limit) 
        this.mystate.start=this.mystate.total-this.mystate.limit;//total >limit
    if(this.mystate.start<0)
    {
      this.mystate.start=0;
    }
    this.load_data();
  };
  handlePageChange= (e) => {
    this.setState({start_input:e.target.value});
  };

  onDetailClick=(contactid)=>{
    console.log(contactid);
    socket.emit("/parts/showcontact",{id:contactid},(data)=>{
        console.log(data);
    });
  }
  handleNext = (e) => {
    this.mystate.start=this.mystate.start+this.mystate.limit;
    if(this.mystate.start>this.mystate.total-this.mystate.limit) 
        this.mystate.start=this.mystate.total-this.mystate.limit;//total >limit
    if(this.mystate.start<0)
    {
      this.mystate.start=0;
    }
    this.load_data();
  };
  handleEdit=(id)=>{
    console.log(id);
    this.setState({selected:id});
  }
  handleClickButton = () => {
    console.log("=============click");
    var b=ReactDOM.findDOMNode(this.button)
    console.log(b);
    this.setState({
      open: true,
      anchorEl: b,
    });
  };
  openBaoxiang=()=>{
    this.setState({open:true});
  }
  onSelectBaoxiang=(e) => {
    this.setState({open:false,baoxiang:e});
    this.mystate.baoxiang=e;
    this.load_data();
  }
  render() {
    var classes={};
    var hasprev=true;
    var hasnext=true;
    let prev;
    let next;
    console.log(this.mystate);
    console.log(this.state);
    if(this.state.start===0){
      hasprev=false;
    }
    if(this.state.start+this.state.limit>=this.state.total){
      hasnext=false;
    }
    if (hasprev){
      prev=(<Button  raised onClick={this.handlePrev}>前一页</Button>);
    }
    else{
      prev=null;
    }
    if(hasnext){
      next=(<Button  raised  onClick={this.handleNext}>后一页</Button>);
    }
    else{
      next=null;
    }
    const contactRows = this.state.contacts.map((contact, idx) => (
      <TableRow      key={idx} >
        <TableCell>{contact.id}</TableCell>
        <TableCell>{contact.hetongbh}</TableCell>
        <TableCell>{contact.yonghu}</TableCell>
        <TableCell>{contact.baoxiang}</TableCell>
        <TableCell>{contact.yiqixinghao}</TableCell>
        <TableCell>
           <ContactEdit  title="编辑" contact={idx} parent={this}/>
        </TableCell>
      </TableRow>
    ));
    return (
      <div className="App">
        <Toolbar>
       
          <input type="text" value={this.state.search}  placeholder="合同 or 仪器编号" onChange={this.handleSearchChange} />
          <Button  raised id="id_bt_search" className="btm btn-info" onClick={this.search}>搜索</Button>
         <Button  raised className="btn btn-primary" onClick={()=>this.handleEdit(null)}>新仪器</Button>
           <Button  raised>导入标样</Button>
         <div>过滤:</div>
         <Button raised
          ref={node => {
            this.button = node;
          }}
          className={classes.button}
          onClick={this.handleClickButton}
        >
        {this.state.baoxiang}
        </Button>
        <Menu id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}>
          <MenuItem onClick={() => this.onSelectBaoxiang("马红权")}>马红权</MenuItem>
          <MenuItem onClick={() => this.onSelectBaoxiang("陈旺")}>陈旺</MenuItem>
          <MenuItem onClick={() => this.onSelectBaoxiang("吴振宁")}>吴振宁</MenuItem>
          <MenuItem onClick={() => this.onSelectBaoxiang("")}>*</MenuItem>
       </Menu>
        </Toolbar>
        <Table>
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>合同编号</TableCell>
                <TableCell>用户单位</TableCell>
                <TableCell>包箱</TableCell>
                <TableCell>仪器型号</TableCell>
                <TableCell>actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {contactRows}
            </TableBody>
        </Table>
        {prev}
        <label id="page">{this.state.start+1}../{this.state.total}</label>{next}
        <input maxLength="6" size="6" onChange={this.handlePageChange} value={this.state.start_input} />
        <Button  raised id="page_go"  className="btn btn-info" onClick={this.jump}>跳转</Button>
      </div>
    );
  }
}
export default App;
