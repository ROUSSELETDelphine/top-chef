import React from 'react';
import ReactDOM from 'react-dom';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table/dist/react-bootstrap-table.min.js';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


var restaurantList = require('./lafourchette_restaurants.json')




  class ExternalSort extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        sortName: undefined,
        sortOrder: undefined
      };
      this.onSortChange = this.onSortChange.bind(this);
    }

    onSortChange(sortName, sortOrder) {
      console.info('onSortChange', arguments);
      this.setState({
        sortName,
        sortOrder
      });
    }

    render() {
      const options = {
        sortName: this.state.sortName,
        sortOrder: this.state.sortOrder,
        onSortChange: this.onSortChange
      };
      return (
        <div>
          <BootstrapTable data={ restaurantList } options={ options }>
            <TableHeaderColumn dataField='name' isKey dataSort>Name</TableHeaderColumn>
            <TableHeaderColumn dataField='stars' dataSort>Stars</TableHeaderColumn>
            <TableHeaderColumn dataField='deal'>Deals</TableHeaderColumn>
          </BootstrapTable>
        </div>
      );
    }
  }

ReactDOM.render(<ExternalSort />, document.getElementById('root'));
