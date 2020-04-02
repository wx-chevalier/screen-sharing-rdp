import { Button, DatePicker, Input, InputNumber, Select } from 'antd';
import moment from 'moment';
import React from 'react';

import styles from './index.less';

export type FieldsEditType = 'INPUT' | 'NUMBER' | 'SELECT' | 'DATE';

interface FieldsDetailProps {
  title?: string;
  fields: FieldType[];
  dataSource: Record<string, any>;

  edit?: boolean;
  delete?: boolean;

  saveFun?: (data: Record<string, any>) => void;
  deleteFun?: () => void;
}

interface FieldsDetailState {
  data: Record<string, any>;

  isEditing: boolean;
}

export interface FieldType {
  field: string;
  fieldLv2?: string;
  name: string;
  edit?: FieldsEditType;
  hidden?: boolean;
  editField?: string;
  options?: Record<string, string>[];
}

export class FieldsDetail extends React.Component<
  FieldsDetailProps,
  FieldsDetailState
> {
  constructor(props: FieldsDetailProps) {
    super(props);
    this.state = { data: null, isEditing: false };
  }
  componentDidUpdate() {
    if (this.props.dataSource && !this.state.data) {
      this.setState({ data: this.props.dataSource });
    }
  }

  changeFieldValue = (item: FieldType, value: string | number) => {
    const newData = { ...this.state.data };
    if (item.editField) {
      item.fieldLv2 && newData[item.field]
        ? (newData[item.field][item.editField] = value)
        : null;
      !item.fieldLv2 ? (newData[item.editField] = value) : null;
    } else {
      item.fieldLv2 && newData[item.field]
        ? (newData[item.field][item.fieldLv2] = value)
        : null;
      !item.fieldLv2 ? (newData[item.field] = value) : null;
    }
    this.setState({
      data: newData,
    });
  };

  getValueByField = (item: FieldType, type?: string) => {
    let res = null;
    if (item.editField) {
      if (item.fieldLv2) {
        res =
          this.state.data && this.state.data[item.field]
            ? this.state.data[item.field][item.editField]
            : '';
      } else {
        res = this.state.data ? this.state.data[item.editField] : '';
      }
    } else {
      if (item.fieldLv2) {
        res =
          this.state.data && this.state.data[item.field]
            ? this.state.data[item.field][item.fieldLv2]
            : '';
      } else {
        res = this.state.data ? this.state.data[item.field] : '';
      }
    }

    if (type === 'NUMBER') {
      return res !== '' ? (res as number) : 0;
    }
    if (type === 'DATE') {
      return res !== '' ? moment(res) : moment(new Date());
    }
    return res;
  };

  getValueToView = (item: FieldType) => {
    if (item.fieldLv2) {
      return this.props.dataSource && this.props.dataSource[item.field]
        ? this.props.dataSource[item.field][item.fieldLv2]
        : '';
    } else {
      return this.props.dataSource ? this.props.dataSource[item.field] : '';
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          {this.props.title && (
            <div className={styles.title}>{this.props.title}</div>
          )}
          <div className={styles.actions}>
            {this.state.isEditing
              ? [
                  <Button
                    key="btn-edit"
                    style={{ minWidth: 200, height: 32, marginRight: 16 }}
                    onClick={() => this.props.saveFun(this.state.data)}
                  >
                    确定
                  </Button>,
                  <Button
                    key="btn-cancel"
                    style={{ minWidth: 200, height: 32 }}
                    onClick={() =>
                      this.setState({ data: null, isEditing: false })
                    }
                  >
                    取消
                  </Button>,
                ]
              : [
                  <Button
                    key="btn-edit"
                    style={{ width: 120, height: 32, marginRight: 16 }}
                    hidden={!this.props.edit}
                    onClick={() => this.setState({ isEditing: true })}
                  >
                    编辑
                  </Button>,
                  <Button
                    key="btn-delete"
                    style={{ width: 120, height: 32 }}
                    hidden={!this.props.delete}
                    onClick={() => this.props.deleteFun()}
                  >
                    删除
                  </Button>,
                ]}
          </div>
        </div>
        <div className={styles.fields}>
          {this.props.fields.map((item: FieldType) => {
            if (!this.state.isEditing || !item.edit) {
              return (
                <div
                  key={`${item.field}${item.fieldLv2 ? item.fieldLv2 : ''}`}
                  className={styles.fieldItem}
                >
                  <div className={styles.fieldName}>{item.name}:</div>
                  <div className={styles.fieldValue}>
                    {this.getValueToView(item)}
                  </div>
                </div>
              );
            }
            if (item.edit === 'INPUT') {
              return (
                <div
                  key={`${item.field}${item.fieldLv2 ? item.fieldLv2 : ''}`}
                  className={styles.fieldItem}
                >
                  <div className={styles.fieldName}>{item.name}:</div>
                  <div className={styles.fieldValue}>
                    <Input
                      style={{ minWidth: 120 }}
                      value={this.getValueByField(item)}
                      onChange={e =>
                        this.changeFieldValue(item, e.target.value)
                      }
                    />
                  </div>
                </div>
              );
            }
            if (item.edit === 'SELECT') {
              return (
                <div
                  key={`${item.field}${item.fieldLv2 ? item.fieldLv2 : ''}`}
                  className={styles.fieldItem}
                >
                  <div className={styles.fieldName}>{item.name}:</div>
                  <div className={styles.fieldValue}>
                    <Select
                      style={{ minWidth: 120 }}
                      value={this.getValueByField(item)}
                      onChange={(e: string) => this.changeFieldValue(item, e)}
                    >
                      {item.options.map(o => (
                        <Select.Option key={o.id} value={o.id}>
                          {o.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                </div>
              );
            }
            if (item.edit === 'NUMBER') {
              return (
                <div
                  key={`${item.field}${item.fieldLv2 ? item.fieldLv2 : ''}`}
                  className={styles.fieldItem}
                >
                  <div className={styles.fieldName}>{item.name}:</div>
                  <div className={styles.fieldValue}>
                    <InputNumber
                      step={1}
                      style={{ minWidth: 120 }}
                      value={this.getValueByField(item, 'NUMBER')}
                      onChange={e => this.changeFieldValue(item, e)}
                    />
                  </div>
                </div>
              );
            }
            if (item.edit === 'DATE') {
              return (
                <div
                  key={`${item.field}${item.fieldLv2 ? item.fieldLv2 : ''}`}
                  className={styles.fieldItem}
                >
                  <div className={styles.fieldName}>{item.name}:</div>
                  <div className={styles.fieldValue}>
                    <DatePicker
                      style={{ minWidth: 120 }}
                      value={this.getValueByField(item, 'DATE')}
                      onChange={(e: moment.Moment) =>
                        this.changeFieldValue(item, e.format('YYYY-MM-DD'))
                      }
                    />
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }
}
