import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import { Grid, AutoSizer } from 'react-virtualized';
export default class GridExample extends React.PureComponent {
  static contextTypes = {
    list: PropTypes.instanceOf(Object).isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      height: 300,
      overscanColumnCount: 0,
      overscanRowCount: 10,
      rowHeight: 40,
      scrollToColumn: undefined,
      scrollToRow: undefined,
      useDynamicRowHeight: false,
    };

    this._cellRenderer = this._cellRenderer.bind(this);
    this._getColumnWidth = this._getColumnWidth.bind(this);
    this._getRowClassName = this._getRowClassName.bind(this);
    this._getRowHeight = this._getRowHeight.bind(this);
    this._noContentRenderer = this._noContentRenderer.bind(this);
    this._onColumnCountChange = this._onColumnCountChange.bind(this);
    this._onRowCountChange = this._onRowCountChange.bind(this);
    this._onScrollToColumnChange = this._onScrollToColumnChange.bind(this);
    this._onScrollToRowChange = this._onScrollToRowChange.bind(this);
    this._renderBodyCell = this._renderBodyCell.bind(this);
    this._renderLeftSideCell = this._renderLeftSideCell.bind(this);
  }

  render() {
    const {
      height,
      overscanColumnCount,
      overscanRowCount,
      rowHeight,
      scrollToColumn,
      scrollToRow,
      useDynamicRowHeight,
    } = this.state;

    return (
      <AutoSizer>
        {({ width, height }) => (
          <Grid
            cellRenderer={this._cellRenderer}
            className={'BodyGrid'}
            columnWidth={this._getColumnWidth}
            columnCount={3}
            height={height}
            noContentRenderer={this._noContentRenderer}
            overscanColumnCount={overscanColumnCount}
            overscanRowCount={overscanRowCount}
            rowHeight={useDynamicRowHeight ? this._getRowHeight : rowHeight}
            rowCount={this.context.list.size}
            scrollToColumn={scrollToColumn}
            scrollToRow={scrollToRow}
            width={width}
            height={height}
          />
        )}
      </AutoSizer>
    );
  }

  _cellRenderer({ columnIndex, key, rowIndex, style }) {
    // if (columnIndex === 0) {
    //   return this._renderLeftSideCell({columnIndex, key, rowIndex, style});
    // } else {
    return this._renderBodyCell({ columnIndex, key, rowIndex, style });
    // }
  }

  _getColumnWidth({ index }) {
    switch (index) {
      case 0:
        return 50;
      // case 1:
      //   return 100;
      // case 2:
      //   return 300;
      default:
        return 80;
    }
  }

  _getDatum(index) {
    const { list } = this.context;

    return list.get(index % list.length);
  }

  _getRowClassName(row) {
    return row % 2 === 0 ? 'evenRow' : 'oddRow';
  }

  _getRowHeight({ index }) {
    return this._getDatum(index).size;
  }

  _noContentRenderer() {
    return <div className={'noCells'}>No cells</div>;
  }

  _renderBodyCell({ columnIndex, key, rowIndex, style }) {
    //const rowClass = this._getRowClassName(rowIndex);
    //const datum = this._getDatum(rowIndex);

    let content;
    const datum = this.context.list.get(rowIndex);
    // console.log(datum)
    // console.log(columnIndex);

    switch (columnIndex) {
      case 0:
        content = datum.index;
        break;
      case 1:
        content = datum.name;
        break;
      case 2:
        content = datum.random;
        break;
      default:
        content = '';
        break;
    }

    const classNames = cn('rowClass', 'cell', {
      centeredCell: columnIndex > 2,
      headerCell: rowIndex === 0,
    });
    // console.log(rowClass);
    // console.log(styles.cell);
    // console.log(styles.centeredCell);
    // console.log(classNames)    ;
    // style.backgroundAttachment="scroll";
    // style.backgroundClip="border-box";
    // style.display="block";
    // style.lineHeight="20px"
    // style.overflow="hidden";
    //style.overflowY="hidden";
    // font-weight: bold;
    // border: 0px solid transparent;
    // border-radius: 0.28571429rem;
    // -webkit-transition: background 0.1s ease;
    // transition: background 0.1s ease;

    return (
      <span className={classNames} style={style} key={key}>
        {content}
      </span>
    );
    // return (
    //   <Label basic key={key} >
    //     {content}
    //   </Label>
    // );
  }

  _renderLeftSideCell({ key, rowIndex, style }) {
    const datum = this._getDatum(rowIndex);

    const classNames = cn('cell', 'letterCell');

    // Don't modify styles.
    // These are frozen by React now (as of 16.0.0).
    // Since Grid caches and re-uses them, they aren't safe to modify.
    style = {
      ...style,
      backgroundColor: datum.color,
    };
    console.log(datum);

    return (
      <div className={classNames} key={key} style={style}>
        {datum.name.charAt(0)}
      </div>
    );
  }

  _updateUseDynamicRowHeights(value) {
    this.setState({
      useDynamicRowHeight: value,
    });
  }

  _onColumnCountChange(event) {
    const columnCount = parseInt(event.target.value, 10) || 0;

    this.setState({ columnCount });
  }

  _onRowCountChange(event) {
    const rowCount = parseInt(event.target.value, 10) || 0;

    this.setState({ rowCount });
  }

  _onScrollToColumnChange(event) {
    const { columnCount } = this.state;
    let scrollToColumn = Math.min(
      columnCount - 1,
      parseInt(event.target.value, 10)
    );

    if (isNaN(scrollToColumn)) {
      scrollToColumn = undefined;
    }

    this.setState({ scrollToColumn });
  }

  _onScrollToRowChange(event) {
    const { rowCount } = this.state;
    let scrollToRow = Math.min(rowCount - 1, parseInt(event.target.value, 10));

    if (isNaN(scrollToRow)) {
      scrollToRow = undefined;
    }

    this.setState({ scrollToRow });
  }
}
GridExample.contextTypes = {
  list: PropTypes.instanceOf(Object),
};
