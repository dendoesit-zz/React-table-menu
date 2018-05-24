import React, { Component } from 'react';
import {BootstrapTable, 
       TableHeaderColumn} from 'react-bootstrap-table';
import '../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

 
class ActiveFormatter extends React.Component {
  render() {
    return (
      <input type='checkbox' checked={ this.props.active }/>
    );
  }
}

function activeFormatter(cell, row, enumObject, index) {
  console.log(`The row index: ${index}`);
  return (
    <ActiveFormatter active={ cell } />
  );
}


class Table extends Component {
  render() {
    return (
      <div>
        <BootstrapTable data={this.props.data} pagination>
          <TableHeaderColumn isKey dataField='id'>
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField='name'>
            Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField='value'>
            Value
          </TableHeaderColumn>
        <TableHeaderColumn dataField='active' dataFormat={ activeFormatter }>Active</TableHeaderColumn>

        </BootstrapTable>
      </div>
    );
  }
}
 
export default Table;