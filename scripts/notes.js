var notesString = localStorage.getItem("notes");
var notes;
if(notesString){
  notes = JSON.parse(notesString);
} else {
  notes = [
    {
      "index": 0,
      "color": "Yellow",
      "title": "Welcome to Scribble",
      "content": "You can scribble all your wonderful ideas in one place. Just click on the create icon at the bottom right to start.",
      "status": "current"
    },
    {
      "index": 1,
      "color": "Orange",
      "title": "Colors",
      "content": "You can change the color of the note by clicking on the pallete icon for each note to categorize them.",
      "status": "current"
    },
    {
      "index": 2,
      "color": "Blue",
      "title": "Status",
      "content": "You can change the status of the notes to keep only the current notes in your main section.",
      "status": "current"
    }
  ];
}


var colors = [
	{
		class: "white",
		color: "White"
	},{
		class: "red accent-1",
		color: "Red"
	},{
		class: "orange lighten-3",
		color: "Orange"
	},{
		class: "yellow accent-1",
		color: "Yellow"
	},{
		class: "blue-grey lighten-4",
		color: "Grey"
	},{
		class: "light-blue accent-1",
		color: "Blue"
	},{
		class: "teal accent-1",
		color: "Teal"
	},{
		class: "light-green accent-1",
		color: "Green"
	}
];


/* Search */
var Search = React.createClass({
  getInitialState: function() {
      return {
        searchClass: "search-wrapper card"
      };
    },
  searchFocus: function () {
    this.setState({
        searchClass : "search-wrapper card focused"
      });
  },
  searchBlur: function () {
    this.setState({
        searchClass : "search-wrapper card"
      });
  },
  render(){
    return(
      <div className={this.state.searchClass}>
              <input id="search" onFocus={this.searchFocus} onBlur={this.searchBlur}/><i className="material-icons">search</i>
            </div>
    );
  }
})


var SideMenu = React.createClass({
	getInitialState: function() {
		return {
			currentState: "current"
		};
	},
	showNotes:function (state) {
		if(this.state.currentState != state){
			this.setState({
				currentState : state 
			});
			$('.cards-container').isotope({ filter: '.'+state });
			$('.noteStatusBtn').removeClass('active');
			$('#btn-'+state).addClass('active');
      $('.button-collapse').sideNav('hide');
		}
	},
  render() {
    return (
      <ul id="nav-mobile" className="side-nav fixed ">
            <li>
              <div className="userView">
                <img className="background" src="images/office.jpg" />
                <a href="#!user"><img className="circle" src="images/yuna.jpg" /></a>
                <a href="#!name"><span className="white-text name">John Doe</span></a>
                <a href="#!email"><span className="white-text email">jdandturk@gmail.com</span></a>
              </div>
            </li>
            <li className="search hide" id="searchContainer">
              <Search />
            </li>
            <li><a id="btn-current" className="sideBorder noteStatusBtn waves-effect waves-teal active" onClick={this.showNotes.bind(this,"current")}><i className="material-icons">lightbulb_outline</i>Notes</a></li>
            <li><a id="btn-archive" className="sideBorder noteStatusBtn waves-effect waves-teal " onClick={this.showNotes.bind(this,"archive")}><i className="material-icons">archive</i>Archive</a></li>
            <li><a id="btn-trash" className="sideBorder noteStatusBtn waves-effect waves-teal " onClick={this.showNotes.bind(this,"trash")}><i className="material-icons">delete</i>Trash</a></li>
            <li><div className="divider"></div></li>
            <li><a className="sideBorder waves-effect settings-modal-trigger" ><i className="material-icons">settings</i>Settings</a></li>
            <li><a className="sideBorder waves-effect" href="#!"><i className="material-icons">announcement</i>Send Feedback</a></li>
            <li><a className="sideBorder waves-effect" href="#!"><i className="material-icons">help</i>Help</a></li>
            <li><div className="divider"></div></li>
            <li><a className="sideBorder waves-effect waves-red" href="#!"><i className="material-icons">power_settings_new</i>Log Out</a></li>
          </ul>
    );
  }
});

var MainNav = React.createClass({
  render() {
    return (
      <nav className="nav-main">
            <div className="nav-wrapper row teal">
              <div className="col s12">
                  <a href="#!" className="brand-logo">Scribble</a>
                  <a href="#" data-activates="nav-mobile" className="button-collapse"><i className=" material-icons">menu</i></a>
                  <ul className="right">
                    <li className="hide"><a href="sass.html"><i className="material-icons">search</i></a></li>
                    <li className="hide"><a href="#!" className="hide-on-small-only" ><i className=" material-icons tooltipped" data-tooltip="List View">view_stream</i></a></li>
                    <li className="hide"><a href="#!" className="hide-on-med-and-down"><i className="material-icons">view_module</i></a></li>
                    <li className="hide"><a href="#!"><i className=" material-icons tooltipped"  data-tooltip="Refresh">refresh</i></a></li>
                  </ul>
                </div>
            </div>
          </nav>
    );
  }
})
var Header = React.createClass({
  componentDidMount: function() {
    $(".button-collapse").sideNav();
  },
  render() {
    return (
      <header>
        <SideMenu/>
        <MainNav/>
      </header>
    );
  }
})


/* Color Circle */
var ColorCircle = React.createClass({
	changeColor : function (color) {
		//alert(color)
		this.props.changeColor(color)
	},
	render() {
		var colorClassName = this.props.data.colorClass+" tooltipped"
		return (
			<span className={colorClassName} data-tooltip={this.props.data.color} onClick={this.changeColor.bind(this,this.props.data.color)}><i className={this.props.data.currentColorIndicator}>done</i></span>
		);
	}
})

/* Color Selector */
var ColorSelector = React.createClass({
	getInitialState: function() {
  		return {
  			colorSelectorClass : "card colors-container hidden",
  			currentColor : this.props.currentColor
  		};
  	},
  	colorMouseOver: function () {
  		this.setState({
  			colorSelectorClass : "card colors-container visible"
  		});
  	},
  	colorMouseOut: function () {
  		this.setState({
  			colorSelectorClass : "card colors-container hidden"
  		});	
  	},
  	changeColor: function (selectedColor) {
  		this.setState({
  			currentColor : selectedColor
  		});
  		this.props.changeColor(selectedColor)
  	},
	render: function () {
		var colors = [];
		var currentColor = this.state.currentColor;
		var that = this;
		this.props.colors.forEach(function(color) {
			var colorClass = "circle "+color.class;
			var currentColorIndicator = "";
			if(currentColor == color.color){
				currentColorIndicator ="large material-icons"
			}
			else{
				currentColorIndicator ="large material-icons hide"
			}
			var data = {}
			data.colorClass = colorClass;
			data.color = color.color;
			data.currentColorIndicator = currentColorIndicator;
			colors.push(<ColorCircle data={data} key={color.color} changeColor={that.changeColor}/>);
	    });
		return(
			<div className={this.state.colorSelectorClass} onMouseOver={this.colorMouseOver} onMouseOut={this.colorMouseOut}>
				{colors}
			</div>
		)
	}
})
/*Action Items */
var ActionItmes = React.createClass({
	getInitialState: function() {
		return {
			colorClass : "blue-grey-text text-darken-2 tooltipped hide",
			archiveClass : "blue-grey-text text-darken-2 tooltipped hide",
			deleteClass : "blue-grey-text text-darken-2 tooltipped hide",
			unarchiveClass : "blue-grey-text text-darken-2 tooltipped hide",
			restoreClass : "blue-grey-text text-darken-2 tooltipped hide",
			deleteFClass : "blue-grey-text text-darken-2 tooltipped hide"
		};
	},
	actionSelected: function (status) {
		this.props.actionSelected(status)
	},
  	colorMouseOver: function () {
  		this.props.colorMouseOver();
  	},
  	colorMouseOut: function () {
  		this.props.colorMouseOut();
  	},
	showActionItmes : function (status) {
		if(status == "archive"){
			this.setState({
				colorClass : "blue-grey-text text-darken-2 tooltipped",
				archiveClass : "blue-grey-text text-darken-2 tooltipped hide",
				unarchiveClass : "blue-grey-text text-darken-2 tooltipped",
				deleteClass : "blue-grey-text text-darken-2 tooltipped",
				restoreClass : "blue-grey-text text-darken-2 tooltipped hide",
				deleteFClass : "blue-grey-text text-darken-2 tooltipped hide"
			});
		} else if(status == "current"){
			this.setState({
				colorClass : "blue-grey-text text-darken-2 tooltipped",
				archiveClass : "blue-grey-text text-darken-2 tooltipped",
				deleteClass : "blue-grey-text text-darken-2 tooltipped",
				unarchiveClass : "blue-grey-text text-darken-2 tooltipped hide",
				restoreClass : "blue-grey-text text-darken-2 tooltipped hide",
				deleteFClass : "blue-grey-text text-darken-2 tooltipped hide"
			});
		} else if(status == "trash"){
			this.setState({
				colorClass : "blue-grey-text text-darken-2 tooltipped hide",
				archiveClass : "blue-grey-text text-darken-2 tooltipped hide",
				deleteClass : "blue-grey-text text-darken-2 tooltipped hide",
				unarchiveClass : "blue-grey-text text-darken-2 tooltipped hide",
				restoreClass : "blue-grey-text text-darken-2 tooltipped",
				deleteFClass : "blue-grey-text text-darken-2 tooltipped"
			});
		}
	},
	componentWillMount: function() {
		this.showActionItmes(this.props.status);
	},
	render() {
		return (
			<div className={this.props.noteActionItemsClass}>
		    <a ref="colorsRef" className={this.state.colorClass} data-tooltip="Change Colors" href="#!" onMouseOver={this.colorMouseOver} onMouseOut={this.colorMouseOut}><i className="material-icons">color_lens</i></a>
				<a ref="archiveRef" className={this.state.archiveClass} onClick={this.actionSelected.bind(this,"archive")} data-tooltip="Archive" href="#!"><i className="material-icons">archive</i></a>
				<a ref="unarchiveRef" className={this.state.unarchiveClass} onClick={this.actionSelected.bind(this,"unarchive")} data-tooltip="Unarchive" href="#!"><i className="material-icons">unarchive</i></a>
				<a ref="deleteRef" className={this.state.deleteClass} onClick={this.actionSelected.bind(this,"delete")} data-tooltip="Delete" href="#!"><i className="material-icons">delete</i></a>
				<a ref="restoreRef" className={this.state.restoreClass} onClick={this.actionSelected.bind(this,"restore")} data-tooltip="Restore" href="#!"><i className="material-icons">restore</i></a>
				<a ref="deleteFRef" className={this.state.deleteFClass} onClick={this.actionSelected.bind(this,"delete-forever")} data-tooltip="Delete Forever" href="#!"><i className="material-icons">delete_sweep</i></a>
		  </div>
		);
	}
})
/* Note */
var Note = React.createClass({
	getInitialState: function() {
		return {
			noteActionItemsClass: "note-action-items",
			noteMainClass : "card mynote-card hoverable",
			noteColor : "",
			status : this.props.note.status,
      color : this.props.note.color
		};
	},
	colorMouseOver: function () {
		this.refs.colorSelector.colorMouseOver();
	},
	colorMouseOut: function () {
		this.refs.colorSelector.colorMouseOut();
	},
	changeColor : function (newColor) {
		this.setColor(newColor);
	},
	setColor: function (color) {
		var colorClass = "";
  	for (var i = 0; i < this.props.colors.length; i++) {
  		if(this.props.colors[i].color == color)
  			colorClass = this.props.colors[i].class;
  	}
  	this.setState({
			noteMainClass : "card mynote-card hoverable "+colorClass+" "+this.props.note.status+" note-"+this.props.note.index,
			noteColor : colorClass,
      color : color
		});	
    this.props.note.color = color;
    this.props.updateNoteStatus(this.props.note);
	},
	actionSelected: function (action) {
		var status = "";
		if(action == "archive"){
			status = "archive";
		} else if(action == "unarchive" || action == "restore"){
			status = "current";
		} else if(action == "delete"){
			status = "trash";
		}
		this.setState({
			noteMainClass : "card mynote-card hoverable "+this.state.noteColor+" "+status,
      status : status
		});
    this.props.note.status = status;
    this.props.updateNoteStatus(this.props.note);
		this.refs.ActionItmesRef.showActionItmes(status);
		setTimeout(function() {
  			$('.cards-container').isotope();
		}, 0);
	},
  updateNote: function (note) {
    note.color = this.state.color;
    this.props.updateNote(note);
  },
	componentWillMount() {
		this.setColor(this.props.note.color);
	},
	render: function(){		
		return (
		  <div ref="noteComponent" className={this.state.noteMainClass}>
		    <div className="card-content" onClick={this.updateNote.bind(this,this.props.note)}>
		      <span className="card-title">{this.props.note.title}</span>
		      <p>{this.props.note.content}</p>
		    </div>
		    <div className="card-action">
		      <ActionItmes ref="ActionItmesRef" colorMouseOver={this.colorMouseOver} colorMouseOut={this.colorMouseOut} noteActionItemsClass={this.state.noteActionItemsClass} status={this.state.status} actionSelected={this.actionSelected}/>
		      <ColorSelector ref="colorSelector" colors={this.props.colors} currentColor={this.props.note.color} changeColor={this.changeColor}/>
		    </div>
		  </div>
      
		);
	}
});
/* Notes */
var Notes = React.createClass({
  updateNote: function (note) {
    this.props.openNoteModalBtn(note);
  },
  updateNoteStatus: function (note) {
    this.props.noteActionButtonClick(note,"update");
  },
	render() {
		var notes = [];
    var that = this;
		this.props.notes.forEach(function(note) {
			notes.push(<Note updateNoteStatus={that.updateNoteStatus} updateNote={that.updateNote} note={note} key={note.index} colors={colors}/>);
	    });
		return (
			<div>
				{notes}
			</div>
		);
	}
})

var MyNotesApp = React.createClass({
  getInitialState: function() {
    return {
     notes : notes,
      note: {},
      type : "create"
    };
  },
  noteActionButtonClick: function (note,type) {
    var notes = this.state.notes;
    if(type == "create"){
      notes.push(note);
      this.setState({
        type: "create" 
      });
    } else {
      notes[note.index] = note;
      this.setState({
        type: "update" 
      });
    }
    this.setState({
      notes: notes,
      note: note
    });
    localStorage.setItem("notes", JSON.stringify(notes));
  },
  openNoteModalBtn: function (note) {
    $('#create-note-modal').openModal();
    var div = document.getElementById("note-content");
    this.refs.creatNote.loadNote(note);
    div.onfocus = function() {
      window.setTimeout(function() {
        var sel, range;
        if (window.getSelection && document.createRange) {
          range = document.createRange();
          range.selectNodeContents(div);
          range.collapse(true);
          sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        } else if (document.body.createTextRange) {
          range = document.body.createTextRange();
          range.moveToElementText(div);
          range.collapse(true);
          range.select();
        }
      }, 1);
    };
    div.focus();
  },
  componentDidUpdate(prevProps, prevState) {
    if(this.state.type == "create"){
      $('.cards-container').isotope( 'prepended', $('.note-'+(this.state.notes.length-1)) );
    }
    setTimeout(function() {
      $('.cards-container').isotope();
    }, 500);
  },
	componentDidMount: function() {

		$('#myNotesApp').fadeIn("slow");
			$('#preloader').fadeOut("slow");
		var $grid =$('.cards-container').isotope({
		  // set itemSelector so .grid-sizer is not used in layout
		  itemSelector: '.mynote-card',
		  masonry: {
		    // use element for option
		    columnWidth: 25
		  },
		  filter : '.current'
		});
    setTimeout(function() {
      $grid.isotope('layout');
    }, 500);
	},
	render() {
		return (
			<div>
			  	<Header />
			  	<main>
			  		<div className="cards-container" id="notesContainer">
			  			<Notes notes={this.state.notes} openNoteModalBtn={this.openNoteModalBtn} noteActionButtonClick={this.noteActionButtonClick}/>
			      </div>
            <a onClick={this.openNoteModalBtn.bind(this,null)} className="btn-floating btn-large waves-effect waves-light teal createNoteButton tooltipped" data-tooltip="Add Note" href="#create-note-modal"><i className="material-icons">mode_edit</i></a>
			  	</main>
			  	<ToolTip />
          <CreateNote ref="creatNote" colors={colors} note={this.state.note} currentIndex={this.state.notes.length} noteActionButtonClick={this.noteActionButtonClick}/>
			</div>
		);
	}
})

var CreateNote = React.createClass({
  getInitialState: function() {
    return {
      noteTitle: "",
      noteContent:"",
      createNoteModalClass : "modal",
      noteColor: "White",
      note : this.props.note,
      noteActionType: "create"
    };
  },
  loadNote: function (note) {
    if(note){
      $('#note-color-picker').hide();
      this.setColor(note.color);
      this.setState({
        noteTitle: note.title,
        noteContent: note.content,
        noteActionType: "udpate",
        note: note
      });

      $('.note-placeholder').hide();
      this.refs.noteTitleRef.innerText = note.title;
      if(note.title.length == 0){
        $('#note-title-placeholder').show();
      }
      this.refs.noteContentRef.innerText = note.content;
      if(note.content.length == 0){
        $('#note-content-placeholder').show();
      }
    }else{
      this.setColor("White");
      $('#note-color-picker').show();
      this.setState({
        noteTitle: "",
        noteContent: "", 
        noteActionType : "create",
        note: {}
      });
      this.refs.noteTitleRef.innerText ="";
      this.refs.noteContentRef.innerText = "";
      $('.note-placeholder').show();
    }
  },
  noteKeyUp: function (type) {
    var value = "";
    if(type == "note-title-placeholder"){
      value = this.refs.noteTitleRef.innerText;
    }else if(type == "note-content-placeholder") {
      value = this.refs.noteContentRef.innerText;
    }
    if(value.length !=0){
      $('#'+type).hide()
    } else {
      $('#'+type).show()
    }
  },
  colorMouseOver: function () {
    this.refs.colorSelector.colorMouseOver();
  },
  colorMouseOut: function () {
    this.refs.colorSelector.colorMouseOut();
  },
  changeColor : function (newColor) {
      this.setColor(newColor);
  },
  setColor: function (color) {
    var colorClass = "";
    for (var i = 0; i < this.props.colors.length; i++) {
      if(this.props.colors[i].color == color)
        colorClass = this.props.colors[i].class;
    }
    this.setState({
      createNoteModalClass : "modal "+colorClass,
      noteColor : color
    });
  },
  noteDonebtn: function (type) {
    var note = {};
    
    note.title = this.refs.noteTitleRef.innerText;
    note.content = this.refs.noteContentRef.innerText;
    note.color = this.state.noteColor;
    note.status = "current";
    this.refs.noteTitleRef.innerHTML = "";
    this.refs.noteContentRef.innerHTML = "";
    $('.note-placeholder').show();
    if(note.title.length || note.content.length){
      if(this.state.noteActionType == "create"){
        note.index = this.props.currentIndex;
        this.props.noteActionButtonClick(note,"create");
      } else {
        note.index = this.state.note.index;
        this.props.noteActionButtonClick(note,"update");
      }
    }
    $('#create-note-modal').closeModal();
  },
  render: function() {
    return (
      <div id="create-note-modal" className={this.state.createNoteModalClass}>
        <div className="modal-content">
          <h4 id="note-title-placeholder" className="note-title note-placeholder">Title</h4>
          <h4 ref="noteTitleRef" id="note-title"  onKeyUp={this.noteKeyUp.bind(this,"note-title-placeholder")} className="note-title" contentEditable="true" spellCheck="true"></h4>
          <p id="note-content-placeholder" className="note-placeholder">Take a note..</p>
          <p ref="noteContentRef" contentEditable="true" onKeyUp={this.noteKeyUp.bind(this,"note-content-placeholder")}  className="note-content" spellCheck="true" id="note-content"></p>
        </div>
        <div className="modal-footer">
          <a onClick={this.noteDonebtn.bind(this,"save")} href="#!" className="waves-effect waves-green btn-flat">Done</a>
          <a id="note-color-picker" ref="colorsRef" className="change-color blue-grey-text text-darken-2 right tooltipped" data-tooltip="Change Colors" href="#!"  onMouseOver={this.colorMouseOver} onMouseOut={this.colorMouseOut}><i className="material-icons">color_lens</i></a>
          <ColorSelector className="colors-container" ref="colorSelector" colors={this.props.colors} currentColor={this.state.noteColor} changeColor={this.changeColor}/>
        </div>
      </div>
    );
  }
})
var ToolTip = React.createClass({
  componentDidMount() {
    
    $('.tooltipped').on({
      mouseover: function() {
            event.preventDefault();
            var offset = $(this).offset();
            var height = $(this).innerHeight();
            $('#custom-tooltip').offset({top:(offset.top+height+5), left:offset.left});
            $('#custom-tooltip').html($(this).attr("data-tooltip"));
        },
        mouseout: function() {
            event.preventDefault();
            $('#custom-tooltip').offset({top:-100, left:0});
            $('#custom-tooltip').html("");
        }
    });
  },
	render() {
		return (
			<div className="custom-tooltip toast" id="custom-tooltip">
				
			</div>
		);
	}
})

ReactDOM.render(
  <MyNotesApp />,
  document.getElementById('myNotesApp')
);