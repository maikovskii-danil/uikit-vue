export interface IHeaderCell {
  id: string;
  displayName: string;
  twStyle: string;
}

export interface ICell {
  value: string;
  twStyle: string;
}

export interface IRow {
  id: string;
  cells: ICell[];
}

export interface ITable {
  headers: IHeaderCell[];
  rows: IRow[];
}

export interface ITableProps {
  headers: IHeaderCell[];
  rows: Omit<IRow, 'id'>[];
}
