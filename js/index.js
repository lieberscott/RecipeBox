var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// React & Redux libraries setup
var _React = React,
    Component = _React.Component;
var _Redux = Redux,
    createStore = _Redux.createStore,
    applyMiddleware = _Redux.applyMiddleware;
var _ReactRedux = ReactRedux,
    Provider = _ReactRedux.Provider;
var _ReactRedux2 = ReactRedux,
    connect = _ReactRedux2.connect;
var _Redux2 = Redux,
    combineReducers = _Redux2.combineReducers;


var initState = void 0;

if (JSON.parse(localStorage.getItem("rritems")) === null) {
  initState = {
    popup: false,
    editing: false,
    undo: false,
    items: [{ name: "Tofu tacos", ingredients: ["Shells", "600mg tofu", "1/8 oz shredded mozzarella cheese", "1 head of lettuce", "1 tsp. chili powder", "1/2 tsp. paprika", "1 tsp. oregano", "2 tsp. chopped onion", "1 tsp. cumin", "1 tsp. salt", "1 tsp. black pepper"] }, { name: "Banana Smoothie", ingredients: ["2 bananas", "1/2 cup vanilla yogurt", "1/2 cup skim milk", "2 teaspoons honey", "pinch of cinnamon"] }, { name: "Holy Guacamole", ingredients: ["2 ripe avocados", "1/2 teaspoon Kosher salt", "1 Tbsp of fresh lime juice or lemon juice", "2 Tbsp to 1/4 cup of minced red onion or thinly sliced green onion", "1-2 minced serrano chiles (stems and seeds removed)", "2 tbsps. cilantro (leaves and tender stems) finely chopped", "A dash of freshly grated black pepper", "1/2 ripe tomato (seeds and pulp removed) chopped"] }, { name: "PB&J", ingredients: ["Peanut butter", "Jelly", "Bread"] }]
  };
} else {
  initState = JSON.parse(localStorage.getItem("rritems"));
}

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
  var action = arguments[1];

  var newState = void 0;
  switch (action.type) {
    default:
      return state;
    case "ADD":
      newState = _extends({}, state, {
        items: [].concat(_toConsumableArray(state.items), [{
          name: action.food,
          ingredients: action.ingredients
        }]),
        prevArray: [].concat(_toConsumableArray(state.items))
      });
      localStorage.setItem("rritems", JSON.stringify(newState));
      return newState;
      break;

    case "POPUP":
      newState = _extends({}, state);
      newState.popup = !newState.popup;
      return newState;
      break;

    case "UNDO_STATUS":
      newState = _extends({}, state);
      newState.undo = action.payload;
      localStorage.setItem("rritems", JSON.stringify(newState));
      return newState;
      break;

    case "DELETE":
      var oldarr = [].concat(_toConsumableArray(state.items));
      var newarr = state.items;
      newarr.splice(action.index, 1);
      newState = _extends({}, state, {
        items: newarr,
        prevArray: oldarr // maintain copy of previous items
      });
      localStorage.setItem("rritems", JSON.stringify(newState));
      return newState;
      break;

    case "EDIT":
      newState = _extends({}, state, {
        prevArray: [].concat(_toConsumableArray(state.items))
      });
      newState.items[action.index] = {
        name: action.food,
        ingredients: action.ingredients
      };
      localStorage.setItem("rritems", JSON.stringify(newState));
      return newState;
      break;

    case "UNDO":
      var prev = state.prevArray;
      newState = _extends({}, state, {
        items: prev
      });
      localStorage.setItem("rritems", JSON.stringify(newState));
      return newState;
      break;
  }
};

var store = createStore(reducer);

/**********************
/*
/*
/* Store and Reducer ^^^^^^^

/* App
/*
/*
/**********************/

var App = function App(props) {
  // app
  return React.createElement(
    "div",
    null,
    React.createElement(Box, null)
  );
};

/**********************
/*
/*
/* App ^^^^^

/* Recipe
/*
/*
/**********************/

var Recipe = function (_React$Component) {
  _inherits(Recipe, _React$Component);

  function Recipe(props) {
    _classCallCheck(this, Recipe);

    var _this = _possibleConstructorReturn(this, (Recipe.__proto__ || Object.getPrototypeOf(Recipe)).call(this, props));

    _this.state = {
      expanded: false,
      editing: false,
      height: 10
    };
    _this.x;

    _this.toggleCollapse = _this.toggleCollapse.bind(_this);
    _this.toggleEditing = _this.toggleEditing.bind(_this);
    _this.deletePress = _this.deletePress.bind(_this);
    return _this;
  }

  _createClass(Recipe, [{
    key: "toggleCollapse",
    value: function toggleCollapse(e) {
      if (e) {
        e.preventDefault();
      };
      this.setState({ expanded: !this.state.expanded, height: this.refs.inner.clientHeight });
    }
  }, {
    key: "toggleEditing",
    value: function toggleEditing(e) {
      if (e) {
        e.preventDefault();
      };
      this.setState({ editing: !this.state.editing });
    }
  }, {
    key: "deletePress",
    value: function deletePress() {
      var _this2 = this;

      this.toggleCollapse();
      this.props.undoStatus(true);
      this.props.deleteItem(this.props.index);

      setTimeout(function () {
        return _this2.props.undoStatus(false);
      }, 5000); // if undo is not clicked, button disappears after 5 seconds
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      // + 15 because otherwise buttons are cut off for some reason
      var currentHeight = this.state.expanded ? this.state.height + 15 : 0;

      var ingredients = this.props.ingredients.map(function (ingredient) {
        return React.createElement(
          "li",
          { className: "list-group-item" },
          ingredient
        );
      });

      return React.createElement(
        "div",
        { className: "panel" },
        React.createElement(
          "div",
          { className: "names", onClick: function onClick(e) {
              return _this3.toggleCollapse(e);
            } },
          this.props.name
        ),
        React.createElement(
          "div",
          { className: "panel-collapse", style: { height: currentHeight + "px" } },
          React.createElement(
            "div",
            { className: "inner", ref: "inner" },
            React.createElement(
              "div",
              { className: "ingredientHeader align-baseline text-center" },
              "Ingredients"
            ),
            React.createElement("hr", null),
            React.createElement(
              "ul",
              { className: "list-group" },
              ingredients
            ),
            React.createElement("br", null),
            React.createElement(
              "button",
              { type: "button", className: "btn btn-sm btn-info", onClick: this.toggleEditing },
              "Edit"
            ),
            React.createElement(
              "button",
              { type: "button", className: "btn btn-sm btn-danger", onClick: this.deletePress },
              "Delete"
            ),
            this.state.editing ? React.createElement(Editpopup, { toggleCollapse: this.toggleCollapse, toggleEditing: this.toggleEditing, index: this.props.index }) : null,
            this.props.data.undo ? React.createElement(Undo, null) : null
          )
        )
      );
    }
  }]);

  return Recipe;
}(React.Component);

var mapStateToPropsRec = function mapStateToPropsRec(state) {
  return {
    data: state
  };
};

var mapDispatchToPropsRec = function mapDispatchToPropsRec(dispatch) {
  return {
    togglePopup: function togglePopup() {
      dispatch(setName());
    },
    deleteItem: function deleteItem(index) {
      dispatch(_deleteItem(index));
    },
    undoStatus: function undoStatus(status) {
      dispatch(_undoStatus(status));
    }
  };
};

function _deleteItem(index) {
  return {
    type: "DELETE",
    index: index
  };
}

Recipe = connect(mapStateToPropsRec, mapDispatchToPropsRec)(Recipe); // use same name as class apparently?

/**********************
/*
/*
/* Recipe ^^^^^^^^

/* Undo
/*
/*
/**********************/

var Undo = function (_React$Component2) {
  _inherits(Undo, _React$Component2);

  function Undo(props) {
    _classCallCheck(this, Undo);

    return _possibleConstructorReturn(this, (Undo.__proto__ || Object.getPrototypeOf(Undo)).call(this, props));
  }

  _createClass(Undo, [{
    key: "render",
    value: function render() {
      var _this5 = this;

      return React.createElement(
        "div",
        { className: "undo" },
        React.createElement(
          "button",
          { className: "btn btn-warning btn-block", onClick: function onClick() {
              return _this5.props.undo(false);
            } },
          "Undo?"
        )
      );
    }
  }]);

  return Undo;
}(React.Component);

var mapStateToPropsUndo = function mapStateToPropsUndo(state) {
  return {
    data: state
  };
};

var mapDispatchToPropsUndo = function mapDispatchToPropsUndo(dispatch) {
  return {
    undo: function undo(status) {
      dispatch(_undo());
      dispatch(_undoStatus(status));
    },
    undoStatus: function undoStatus(status) {
      dispatch(_undoStatus(status));
    }
  };
};

function _undo() {
  return {
    type: "UNDO"
  };
}

function _undoStatus(status) {
  return {
    type: "UNDO_STATUS",
    payload: status
  };
}

Undo = connect(mapStateToPropsUndo, mapDispatchToPropsUndo)(Undo); // use same name as class apparently?

/**********************
/*
/*
/* Undo ^^^^^^^^

/* Editpopup
/*
/*
/**********************/

var Editpopup = function (_React$Component3) {
  _inherits(Editpopup, _React$Component3);

  // editpopup
  function Editpopup(props) {
    _classCallCheck(this, Editpopup);

    var _this6 = _possibleConstructorReturn(this, (Editpopup.__proto__ || Object.getPrototypeOf(Editpopup)).call(this, props));

    _this6.state = {
      food: _this6.props.data.items[_this6.props.index].name,
      ingstring: _this6.props.data.items[_this6.props.index].ingredients.join(","),
      ingarray: _this6.props.data.items[_this6.props.index].ingredients
    };
    _this6.changeFood = _this6.changeFood.bind(_this6);
    _this6.changeIng = _this6.changeIng.bind(_this6);
    _this6.editClick = _this6.editClick.bind(_this6);

    return _this6;
  }

  _createClass(Editpopup, [{
    key: "changeFood",
    value: function changeFood(e) {
      // change food onChange
      this.setState({ food: e.target.value });
    }
  }, {
    key: "changeIng",
    value: function changeIng(e) {
      // change ingstring and ingarray onChange
      var ingstr = e.target.value;
      var ingarr = ingstr.split(",");
      this.setState({ ingstring: ingstr, ingarray: ingarr });
    }
  }, {
    key: "editClick",
    value: function editClick() {
      var _this7 = this;

      this.props.editItem(this.state.food, this.state.ingarray, this.props.index);
      this.props.undoStatus(true);
      this.props.toggleCollapse();
      this.props.toggleEditing();

      setTimeout(function () {
        return _this7.props.undoStatus(false);
      }, 5000); // if undo is not clicked, button disappears after 3 seconds
    }
  }, {
    key: "render",
    value: function render() {

      var food = this.props.data.items[this.props.index].name;
      var ingredients = this.props.data.items[this.props.index].ingredients;

      return React.createElement(
        "div",
        { className: "popup" },
        React.createElement(
          "div",
          { className: "popup-inner" },
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              { "for": "rec" },
              "Recipe:"
            ),
            React.createElement("input", { type: "text", className: "form-control", defaultValue: food, id: "rec", onChange: this.changeFood })
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              { "for": "ing" },
              "Ingredients:"
            ),
            React.createElement("input", { type: "text", className: "form-control", defaultValue: ingredients, id: "ing", onChange: this.changeIng })
          ),
          React.createElement(
            "button",
            { className: "btn btn-outline-secondary align-right", onClick: this.props.toggleEditing },
            "Close me"
          ),
          React.createElement(
            "button",
            { className: "btn btn-primary align-right", onClick: this.editClick },
            "Edit"
          )
        )
      );
    }
  }]);

  return Editpopup;
}(React.Component);

var mapStateToPropsEdPop = function mapStateToPropsEdPop(state) {
  return {
    data: state
  };
};

var mapDispatchToPropsEdPop = function mapDispatchToPropsEdPop(dispatch) {
  return {
    editItem: function editItem(food, ingredients, index) {
      dispatch(_editItem(food, ingredients, index));
    },
    undoStatus: function undoStatus(status) {
      dispatch(_undoStatus(status));
    }
  };
};

function _editItem(food, ingredients, index) {
  if (food != "") {
    return {
      type: "EDIT",
      food: food,
      ingredients: ingredients,
      index: index
    };
  }
}

Editpopup = connect(mapStateToPropsEdPop, mapDispatchToPropsEdPop)(Editpopup); // use same name as class apparently?

/**********************
/*
/*
/* Editpopup ^^^^^^^^^^^

/* Mainbutton
/*
/*
/**********************/

var Mainbutton = function (_React$Component4) {
  _inherits(Mainbutton, _React$Component4);

  function Mainbutton() {
    _classCallCheck(this, Mainbutton);

    return _possibleConstructorReturn(this, (Mainbutton.__proto__ || Object.getPrototypeOf(Mainbutton)).apply(this, arguments));
  }

  _createClass(Mainbutton, [{
    key: "render",
    // mainbutton
    value: function render() {
      return React.createElement(
        "button",
        { className: "btn btn-lg btn-primary", onClick: this.props.togglePopup },
        "Add Recipe"
      );
    }
  }]);

  return Mainbutton;
}(React.Component);

/**********************
/*
/*
/* Mainbutton ^^^^^^^^^^

/* Addpopup
/*
/*
/**********************/

var Addpopup = function (_React$Component5) {
  _inherits(Addpopup, _React$Component5);

  // addpopup
  function Addpopup(props) {
    _classCallCheck(this, Addpopup);

    var _this9 = _possibleConstructorReturn(this, (Addpopup.__proto__ || Object.getPrototypeOf(Addpopup)).call(this, props));

    _this9.state = {
      food: "", // food will be passed up to Box component in addRec()
      ingstring: "", // ingredient string every time keystroke is pressed
      ingarray: [] // ingredient array (from string) will be passed up to Box component in addRec()
    };
    _this9.changeFood = _this9.changeFood.bind(_this9);
    _this9.changeIng = _this9.changeIng.bind(_this9);
    return _this9;
  }

  _createClass(Addpopup, [{
    key: "changeFood",
    value: function changeFood(e) {
      // change food onChange
      this.setState({ food: e.target.value });
    }
  }, {
    key: "changeIng",
    value: function changeIng(e) {
      // change ingredients onChange
      var ingstr = e.target.value;
      var ingarr = ingstr.split(",");
      this.setState({ ingstring: ingstr, ingarray: ingarr });
    }
  }, {
    key: "render",
    value: function render() {
      var _this10 = this;

      return React.createElement(
        "div",
        { className: "popup" },
        React.createElement(
          "div",
          { className: "popup-inner" },
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              { "for": "rec" },
              "Recipe:"
            ),
            React.createElement("input", { type: "text", className: "form-control", placeholder: "Recipe name", id: "rec", onChange: this.changeFood })
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              { "for": "ing" },
              "Ingredients:"
            ),
            React.createElement("input", { type: "text", className: "form-control", placeholder: "Ingredients (seperated by commas)", id: "ing", onChange: this.changeIng })
          ),
          React.createElement(
            "button",
            { className: "btn btn-outline-secondary align-right", onClick: this.props.togglePopup },
            "Close"
          ),
          React.createElement(
            "button",
            { className: "btn btn-primary align-right", onClick: function onClick() {
                return _this10.props.addItem(_this10.state.food, _this10.state.ingarray);
              } },
            "Add recipe"
          )
        )
      );
    }
  }]);

  return Addpopup;
}(React.Component);

var mapStateToPropsAddPop = function mapStateToPropsAddPop(state) {
  return {
    data: state
  };
};

var mapDispatchToPropsAddPop = function mapDispatchToPropsAddPop(dispatch) {
  return {
    togglePopup: function togglePopup() {
      dispatch(_togglePopup());
    },
    addItem: function addItem(food, ingredients) {
      dispatch(_addItem(food, ingredients));
      dispatch(_togglePopup());
    }
  };
};

function _addItem(food, ingredients) {
  if (food != "") {
    return {
      type: "ADD",
      food: food,
      ingredients: ingredients
    };
  };
}

Addpopup = connect(mapStateToPropsAddPop, mapDispatchToPropsAddPop)(Addpopup); // use same name as class apparently?

/**********************
/*
/*
/* Addpopup ^^^^^^^^^^^

/* Box
/*
/*
/**********************/

var Box = function (_React$Component6) {
  _inherits(Box, _React$Component6);

  // box
  function Box(props) {
    _classCallCheck(this, Box);

    return _possibleConstructorReturn(this, (Box.__proto__ || Object.getPrototypeOf(Box)).call(this, props));
  }

  _createClass(Box, [{
    key: "render",
    value: function render() {
      var items = this.props.data.items.map(function (item, index) {
        return React.createElement(
          "div",
          null,
          React.createElement(Recipe, { name: item.name, ingredients: item.ingredients, index: index })
        );
      });
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "box" },
          React.createElement(Headline, null),
          items,
          this.props.data.popup ? React.createElement(Addpopup, { addRecipe: this.addRecipe, closeMe: this.props.togglePopup }) : null
        ),
        React.createElement(Mainbutton, { togglePopup: this.props.togglePopup })
      );
    }
  }]);

  return Box;
}(React.Component);

var mapStateToPropsBox = function mapStateToPropsBox(state) {
  return {
    data: state
  };
};

var mapDispatchToPropsBox = function mapDispatchToPropsBox(dispatch) {
  return {
    togglePopup: function togglePopup() {
      dispatch(_togglePopup());
    },
    deleteItem: function deleteItem(index) {
      dispatch(_deleteItem(index));
    }
  };
};

function _togglePopup() {
  return {
    type: "POPUP"
  };
}

Box = connect(mapStateToPropsBox, mapDispatchToPropsBox)(Box); // use same name as class apparently?

/**********************
/*
/*
/* Box ^^^^^^^^^^^

/* Headline
/*
/*
/**********************/

var Headline = function Headline(props) {
  // headline
  return React.createElement(
    "h1",
    { className: "text-center recipesHeader" },
    React.createElement("i", { className: "fas fa-utensils" }),
    "\xA0 Recipe Box"
  );
};

var main = window.document.getElementById("main");

// Provider wraps our app
ReactDOM.render(React.createElement(
  Provider,
  { store: store },
  React.createElement(App, null)
), main);