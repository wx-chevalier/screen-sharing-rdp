import { notification } from 'antd';

export type NoticeType = 'success' | 'error' | 'info' | 'trusteeship';

export type Notice = (type: NoticeType, title: string, content: string) => void;

const notice: Notice = (type, title, content) => {
  notification[type]({
    message: title,
    description: content,
  });
};

export default notice;
