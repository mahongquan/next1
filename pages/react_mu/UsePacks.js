
import React from 'react';
import Client from './Client';
import {Table, TableBody, TableCell,  TableRow, } from './material-ui';
//import AutoComplete from 'material-ui/AutoComplete';
import Autosuggest from 'react-autosuggest';
import UsePackEdit from "./UsePackEdit_mu";
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
class UsePacks extends React.Component {
  state = {
    usepacks: [],
    showRemoveIcon: false,
    searchValue: '',
    newPackName: '',
    auto_value: '',
    auto_items:[],
    auto_loading: false,
    release:true,
  };

  componentDidMount=()=> {
    if(this.props.contact_id){
      var self=this;
      Client.UsePacks(this.props.contact_id, (usepacks) => {
        console.log(usepacks);
        self.setState({
          usepacks: usepacks.data,//.slice(0, MATCHING_ITEM_LIMIT),
        });
        console.log(usepacks);
      });
    }
  };
  handleSearchChange = (e) => {
    const value = e.target.value;

    this.setState({
      searchValue: value,
    });

    if (value === '') {
      this.setState({
        usepacks: [],
        showRemoveIcon: false,
      });
    } else {
      this.setState({
        showRemoveIcon: true,
      });

      Client.search(value, (usepacks) => {
        this.setState({
          usepacks: usepacks.data,//.slice(0, MATCHING_ITEM_LIMIT),
        });
      });
    }
  };

  handleSearchCancel = () => {
    this.setState({
      usepacks: [],
      showRemoveIcon: false,
      searchValue: '',
    });
  };
  bibei= (id) => {
    this.setState({auto_value:"必备"});
    //this.auto_change("必备");
  };
  new_pack= (id) => {
    var url="/rest/UsePackEx";
    var data={"name":this.state.newPackName,contact:this.props.contact_id};
    Client.postOrPut(url,data,(res) => {
        var p=res.data;
        const newusepacks = this.state.usepacks.concat(p);
        this.setState({ usepacks: newusepacks });
    });
  };
  addrow=(pack_id)=>{
    console.log("addrow=");
    var url="/UsePack";
    var data={contact_id:this.props.contact_id,pack_id:pack_id};
    console.log(data);
    Client.postOrPut(url,data,(res) => {
        var p=res.data;
        const newFoods = this.state.usepacks.concat(p);
        this.setState({ usepacks: newFoods });
    });
  };
  newpackChange=(e)=>{
    this.setState({newPackName:e.target.value});
  };
  onEditClick = (id) => {
  };
  onDeleteClick = (itemIndex) => {
    var url="/UsePack";
    Client.delete1(url,{id:this.state.usepacks[itemIndex].id},(res) => {
        const filteredusepacks = this.state.usepacks.filter(
          (item, idx) => itemIndex !== idx,
        );
        this.setState({ usepacks: filteredusepacks });
    });
  };
  onChange=(event, newValue)=>{
    console.log(newValue);
    this.setState({auto_value:newValue.newValue});
  }
  auto_select=(event,data) => {
      console.log("selected");
      console.log(data)
      this.addrow(data.suggestion.id);
      //this.setState({auto_value:value, auto_items: [ item ] })
  }
  auto_change=(data)=>{
    var value=data.value;
    console.log("auto_change");
    console.log(data);
    if (value.length>1)
    {
      Client.get("/Pack",{search:value} ,(items) => {
          console.log(items);
          this.setState({ auto_items: items.data, auto_loading: false })
      });
    }
  };
  handleSuggestionsClearRequested = () => {
    this.setState({
      auto_items: [],
    });
  }
  renderitems=(item, {isHighlighted}) => {
    console.log("renderitems==========");
    console.log(item);
    console.log(isHighlighted);
    var r=(<div
              style={isHighlighted ? styles.highlightedItem : styles.item}
              key={item.id}
            >{item.id}_{item.name}</div>
          )
    console.log(r)
    return r;
  }
  render() {
    console.log(this.state);
    const { usepacks } = this.state;
    const foodRows = usepacks.map((food, idx) => (
      <TableRow key={idx}>
        <TableCell>{food.id}</TableCell>
        <TableCell>{food.Pack.name}</TableCell>
        <TableCell>
        <UsePackEdit parent={this} index={idx} title="编辑" />
        <a  onClick={() => this.onDeleteClick(idx)} style={{marginLeft:"10px"}}>删除</a>
        </TableCell>
      </TableRow>
    ));

    return (
      <div>
        <Table>
        <TableBody>
        <TableRow>
          <TableCell>id</TableCell>
          <TableCell>name</TableCell>
          <TableCell>actions</TableCell>
        </TableRow>
        {foodRows}
        </TableBody>
        </Table>
        <div>输入包<Autosuggest
          inputProps={{ id: 'states-autocomplete',value:this.state.auto_value,onChange:this.onChange}}
          onSuggestionSelected={this.auto_select}
          onSuggestionsFetchRequested={this.auto_change}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
          getSuggestionValue={(item) => item.name}
          ref="autocomplete"
          suggestions={this.state.auto_items}
          renderSuggestion={this.renderitems}
        />
          <button  className="btn" onClick={this.bibei}>必备</button>
        </div>
      <div>新包名称：
        <input id="new_pack1"  placeholder="新包" value={this.state.newPackName} onChange={this.newpackChange}/>
        <button className="btn btn-info" id="id_new_usepack" onClick={this.new_pack}>新包</button>
      </div>
      </div>
    );
  }
}
export default UsePacks;
