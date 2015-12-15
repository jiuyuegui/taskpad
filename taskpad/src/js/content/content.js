var React = require('react'),
	ReactDOM = require('react-dom'),
	$ = require('jquery');

var HBtnLeft = React.createClass({
	render: function() {
		return (
			<div className="hLeft">
				<span className="navStyle">Boards</span>
				<input type="text" />
			</div>
		);
	}
});

var HBtnRight = React.createClass({
	render: function() {
		return (
			<div className="hRight">	
				<span className="navStyle">zhangyuanyuan</span>	
				<a className="navStyle"></a>
			</div>
		);
	}
});

var Header = React.createClass({
	render: function() {
		return (
			<header className="header">
				<HBtnLeft />
				<HBtnRight />
			</header>
		);
	}
});

var CardList = React.createClass({
  handleAdd: function(e) {
    $(e.currentTarget).hide();
    $(e.currentTarget).closest('form').find('.addlist').show();
    $(e.currentTarget).closest('form').find('span').show();
    $(e.currentTarget).closest('form').find('input').show();
  },
  handleCalcel: function() {
    
  },
  render: function() {
    return (
      <form className="card">
        <div>{this.props.title}</div>
        <a onClick={this.handleAdd}>Add a list...</a>
        <textarea className="addlist"></textarea><br/>
        <input type="button" value="add" />
        <span onClick={this.handleCalcel}>×</span>
      </form>
    );
  }
});

var Listform = React.createClass({
  handleAddSpan: function(e) {
    e.preventDefault();
    $(e.currentTarget).hide();
    $('.save_btn').show();
    $('.save_btn input[type=text]').focus();
  },
  handleCalcel: function() {
    $('.save_btn').hide();
    $('.addspan').show();
  },
  htmlFilter: function(str) {
    return typeof str === 'string' ? str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
  },
  handleSave: function() {
    var $input = $('.save_btn input[type=text]'), text = $input.val(), preText = [];
    if(text.trim() != "") {
      $input.val("").focus();
      if($('form.card div').length > 0) {
        $('form.card div').each(function(i, v) {
          preText.push($(v).text());
        });                                                                                                    
      }
      preText.push(this.htmlFilter(text));
      this.setState({
        text: preText
      }); 
    }
  },
  getInitialState: function() {
    return {
      text: []
    };
  },
  render: function() {    
    var CardLists = this.state.text.map(function(val, index) {
      return (
        <CardList title={val} key={index}>
        </CardList>
      );
    });
    return( 
      <div className="mainContent">
        {CardLists}   
        <form>
          <span className="addspan wrap_list" onClick={this.handleAddSpan}>Add a list...</span>
          <div className="save_btn wrap_list">
            <input type="text" placeholder="Add a list..." />
            <input type="button" onClick={this.handleSave} value="save" />
            <span onClick={this.handleCalcel}>×</span>
          </div>
        </form>
      </div>
    );
  }
});

var Content = React.createClass({
  render: function() {
    return (
      <div id="content">
        <div className="info">
          <div className="info_left">test private</div>
          <div className="info_right">show menu</div>
        </div>
        <Listform />
      </div>
    );
  }
});

var Page = React.createClass({  
  handleOut: function(e) {
    var target = e.target ? e.target : e.srcElement;
    if($(target).prop('class') == 'mainContent' || $(target).prop('class') == 'header' || $(target).prop('id') == 'content') {
      $(target).find('.save_btn').hide();
      $(target).find('.addspan').show();
    }
  },
  render: function() {
    return (
      <div onClick={this.handleOut}>
        <Header />
        <Content />
      </div>
    );
  }
});

ReactDOM.render(<Page />, document.getElementById('main'));