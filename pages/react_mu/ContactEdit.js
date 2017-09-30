import React from 'react';
import AppBar from './material-ui/AppBar';
import Toolbar from './material-ui/Toolbar';
import IconButton from './material-ui/IconButton';
import Typography from './material-ui/Typography';
import CloseIcon from './material-ui-icons/Close';
import Dialog from './material-ui/Dialog';
import Button from './material-ui/Button';
import TextField from './material-ui/TextField';
import Autosuggest from 'react-autosuggest';
import update from 'immutability-helper';
let styles = {
  item: {
    color:"green",
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  },

  menu: {
    border: 'solid 1px #ccc'
  }
}
export default class ContactEdit extends React.Component {
  state = {
    open: false,
    shenhe:null,
    yiqixinghao:null,
    hetongbh:null,
    id:null,
    baoxiang:null,
    yonghu:null,
    tiaoshi_date:null,
    channels:null,
    yiqibh:null,
    addr:null,
    yujifahuo_date:null,

    yiqixinghao_items:["CS-2800","ON-3000"],
    channels_items:["2C+1S","2O"],
    bg:{},
  };
  yiqixinghao_change=(value)=>{
  };
  yiqixinghao_select=(data) => {
      console.log("selected");
      console.log(data);
      //this.addrow(data.value);
      this.setState({yiqixinghao:data});
  }
  setdata=(contact)=>{
    console.log(contact);
    // var arr2 = contact.yujifahuo_date.split("-");
    // var date2 = new Date(arr2[0],parseInt(arr2[1],10)-1,arr2[2]); 
    // arr2 = contact.tiaoshi_date.split("-");
    // var date1 = new Date(arr2[0],parseInt(arr2[1],10)-1,arr2[2]); 
    this.old=contact;
    this.setState({
        open:true,
        yujifahuo_date:contact.yujifahuo_date,
        yonghu:contact.yonghu,
        yiqixinghao:contact.yiqixinghao,
        addr:contact.addr,
        hetongbh:contact.hetongbh,
        shenhe:contact.shenhe,
        tiaoshi_date:contact.tiaoshi_date,
        id:contact.id,
        yiqibh:contact.yiqibh,
        baoxiang:contact.baoxiang,
        channels:contact.channels,
    })
  }
  handleOpen = () => {
    console.log("open");
    this.contact_idx=this.props.contact;
    this.parent=this.props.parent;
    var contact=this.parent.state.contacts[this.contact_idx];
    if (contact==null){
        contact={}
    }
    this.setdata(contact);
  };

  handleClose = () => {
    this.setState({open: false});
  };
  handleChange = (e) => {
    console.log("change");
    // e.target.inputStyle={
    //   width: '50%',
    //   margin: '0 auto',
    //   border: '2px solid #FF9800',
    //   backgroundColor: '#ffd699',
    // };
    console.log(e.target.value);
    if(this.old[e.target.name]===e.target.value)
    {
      const bg2=update(this.state.bg,{[e.target.name]:{$set:"#ffffff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2});
    }
    else{
       const bg2=update(this.state.bg,{[e.target.name]:{$set:"#8888ff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2}); 
    }
    switch(e.target.name)
    {
        case "baoxiang":
            this.setState({baoxiang:e.target.value});
            break;
        case "yonghu":
            this.setState({yonghu:e.target.value});
            break;
        case "addr":
            this.setState({addr:e.target.value});
            break;
        case "channels":
            this.setState({channels:e.target.value});
            break;
        case "yiqixinghao":
            this.setState({yiqixinghao:e.target.value});
            break;
        case "yiqibh":
            this.setState({yiqibh:e.target.value});
            break;
        case "shenhe":
            this.setState({shenhe:e.target.value});
            break;
        case "yujifahuo_date":
            this.setState({yujifahuo_date:e.target.value});
            break;
        case "tiaoshi_date":
            this.setState({tiaoshi_date:e.target.value});
            break;
        case "hetongbh":
            this.setState({hetongbh:e.target.value});
            break;
        default:
            break;
    }
  };
  handleSave= () => {
    let url;
    if (this.state.id){
      url="/put/Contact";
    }
    else{
      url="/post/Contact";
    }
    // let newdate;
    // let newdate2
    // newdate=toDateStr(this.state.yujifahuo_date);
    // newdate2=toDateStr(this.state.tiaoshi_date);
    // var data1=update(this.state,{tiaoshi_date:{$set:newdate2},yujifahuo_date:{$set:newdate}});
    console.log(url);
    console.log(this.props);
    this.props.socket.emit(url,this.state,(res) => {
      console.log(res);
        this.setdata(res.data);
        this.setState({bg:{}});
        this.parent.handleContactChange(this.contact_idx,res.data);
    });
  };
  handleClear= () => {
    console.log("clear");
    this.setState({
        yujifahuo_date:"",
        yonghu:"",
        yiqixinghao:"",
        addr:"",
        hetongbh:"",
        shenhe:"",
        tiaoshi_date:"",
        id:"",
        yiqibh:"",
        baoxiang:"",
        channels:"",
    })
  };
  handleCopy= () => {
    console.log("clear");
    this.setState({
        id:"",
    })
  };
  handleRequestClose=()=>{
    this.setState({open:false});
  }
  tiaoshi_date_change=(e,d)=>{
    this.setState({tiaoshi_date:d});
  }
  yujifahuo_date_change=(e,d)=>{
    this.setState({yujifahuo_date:d});
  }
  channels_change=(event, { newValue })=>{
    this.change1(newValue);
  }
  channels_change_fetch=()=>{}
  channels_select=(event,data)=>{
    this.change1(data.suggestion);
  }
  change1=(item)=>{
      console.log("selected");
      console.log(item);
      console.log(this.old);
      if(this.old.channels===item)
      {
       const bg2=update(this.state.bg,{channels:{$set:"#ffffff"}})
        this.setState({bg:bg2});
      }
      else{
        const bg2=update(this.state.bg,{channels:{$set:"#8888ff"}})
        this.setState({bg:bg2});
      }
      this.setState({channels:item});
  }
  yiqixinghao_change=(event, { newValue })=>{
    this.change2(newValue);
  }
  yiqixinghao_select=(event,data)=>{
    this.change2(data.suggestion);
  }
  change2=(item)=>{
      console.log("selected");
      console.log(item);
      if(this.old.yiqixinghao===item)
      {
       const bg2=update(this.state.bg,{yiqixinghao:{$set:"#ffffff"}})
        this.setState({bg:bg2});
      }
      else{
        const bg2=update(this.state.bg,{yiqixinghao:{$set:"#8888ff"}})
        this.setState({bg:bg2});
      }
      this.setState({yiqixinghao:item});
  }
  renderitems=(item, {isHighlighted}) => {
    console.log("renderitems==========");
    console.log(item);
    console.log(isHighlighted);
    var r=(<div
              style={isHighlighted ? styles.highlightedItem : styles.item}
              key={item}
            >{item}</div>
          )
    console.log(r)
    return r;
  }
  render() {
    console.log(this.props);
    console.log(this.state);
    const customContentStyle = {
      width: '100%',
      maxWidth: 'none',
    };
    //var m1 = new Date(this.state.yujifahuo_date.replace(/-/,"/"));
    //var m2 = new Date(this.state.tiaoshi_date.replace(/-/,"/"));
    return (
      <div>
        <Button raised onClick={this.handleOpen}>{this.props.title}</Button>
        <Dialog fullScreen
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={customContentStyle}
          autoScrollBodyContent={true}
        >
            <Toolbar>
              <IconButton color="blue" onClick={this.handleRequestClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography type="title" color="inherit">
                {this.props.title}
              </Typography>
            </Toolbar>
            <table>
            <tbody>
            <tr >
                <td >
                    ID:
                </td>
                <td >
                    <TextField type="text" id="id" name="id"  disabled={true}    value={this.state.id} />
                </td>
                <td>
                    <label>用户单位:</label>
                </td>
                <td>
                    <TextField type="text" id="yonghu" name="yonghu" value={this.state.yonghu} 
                    style={{
                      backgroundColor: this.state.bg.yonghu,
                    }} 
                    onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    客户地址:
                </td>
                <td>
                    <TextField type="text" id="addr" name="addr" value={this.state.addr}  
                    style={{
                      backgroundColor: this.state.bg.addr,
                    }}
                    onChange={this.handleChange} /> 
                </td>
                <td>
                    通道配置:
                </td>
                <td>
                      <Autosuggest
                      inputProps={
                        { 
                          id: 'channels-autocomplete',
                          style:{backgroundColor:this.state.bg.channels},
                          value:this.state.channels,
                          onChange:this.channels_change
                        }
                      }
                      suggestions={[
                        "1O(低氧)",
                        "1O(高氧)",
                        "1O(低氧)+2N",
                        "1C(低碳)+2S",
                        "1C(高碳)+2S",
                        "2C+1S(低硫)",
                        "2C+1S(高硫)",
                        "2C+2S",
                        "2O+2N",
                        "2O",
                      ]}
                      getSuggestionValue={(item) => item}
                      onSuggestionSelected={this.channels_select}
                      onSuggestionsFetchRequested={()=>{}}
                      renderSuggestion={this.renderitems}
                    />
                </td>
            </tr><tr>
                <td>
                    <label>仪器型号:</label>
                </td>
                <td>
                <Autosuggest
                       inputProps={
                        { 
                          id: 'yiqixinghao-autocomplete',
                          style:{backgroundColor:this.state.bg.yiqixinghao},
                          value:this.state.yiqixinghao,
                          onChange:this.yiqixinghao_change
                        }
                      }
                      suggestions={[
                        "CS-1011C",
                        "CS-2800",
                        "CS-3000",
                        "CS-3000G",
                        "HD-5",
                        "N-3000",
                        "O-3000",
                        "OH-3000",
                        "ON-3000",
                        "ON-4000",
                        "ONH-3000"
                      ]}
                      getSuggestionValue={(item) => item}
                      onSuggestionsFetchRequested={()=>{}}
                      onSuggestionSelected={this.yiqixinghao_select}
                      renderSuggestion={this.renderitems}
                    />
                </td>
                <td>
                    <label>仪器编号:</label>
                </td>
                <td>
                    <TextField type="text" 
                    id="yiqibh" name="yiqibh" 
                    value={this.state.yiqibh} onChange={this.handleChange} 
                    style={{
                      backgroundColor: this.state.bg.yiqibh,
                    }}
                    />
                </td>
            </tr><tr>
                <td>
                    <label>包箱:</label>
                </td>
                <td>
                    <TextField type="text" id="baoxiang" name="baoxiang" value={this.state.baoxiang}  
                    onChange={this.handleChange} 
                    style={{
                      backgroundColor: this.state.bg.baoxiang,
                    }}
                    />
                </td>
                <td>
                    审核:
                </td>
                <td>
                    <TextField  id="shenhe" 
                    name="shenhe" value={this.state.shenhe} onChange={this.handleChange}  
                    style={{
                      backgroundColor: this.state.bg.shenhe,
                    }}
                    />
                </td>
            </tr><tr>
                <td>
                    <label>入库时间:</label>
                </td>
                <td>
                <TextField
                  id="yujifahuo_date"
                  style={{
                      backgroundColor: this.state.bg.yujifahuo_date,
                    }}
                  type="date"
                  defaultValue={this.state.yujifahuo_date}
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                </td>
                <td>
                    调试时间:
                </td>
                <td>
                <TextField
                  id="tiaoshi_date"
                  style={{
                      backgroundColor: this.state.bg.tiaoshi_date,
                    }}
                  type="date"
                  defaultValue={this.state.tiaoshi_date}
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                </td>
            </tr><tr>
                <td>
                    <label>合同编号:</label>
                </td>
                <td>
                    <TextField 
                    style={{
                      backgroundColor: this.state.bg.hetongbh,
                    }}
                    type="text" id="hetongbh" name="hetongbh" value={this.state.hetongbh} onChange={this.handleChange}  />
                </td>
                <td>
                    方法:
                </td>
                <td>
                <TextField 
                style={{
                      backgroundColor: this.state.bg.method,
                    }}
                type="text" id="method" name="method"   disabled={true} value={this.state.method} />
                </td>
            </tr>        
            </tbody>
            </table>
           <div> 
           <Button raised  onClick={this.handleSave} >保存</Button> 
           <Button raised  onClick={this.handleClear} >清除</Button> 
           <Button raised onClick={this.handleCopy} >复制</Button>
           {
            //<UsePacks contact_id={this.state.id}/>
            }
           </div>
        </Dialog>
        </div>
    );
  }
}
