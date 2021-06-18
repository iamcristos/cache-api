/* eslint-disable no-plusplus */
import moment from 'moment';

export const randomString = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random()
 * charactersLength));
  }
  return result;
};

export const getTTL = (time) => {
  const TTL = process.env.TTL || 3600;
  return TTL > moment().diff(time, 'minute');
};
