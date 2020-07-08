import { db } from '../firebaseConfig';

export const SET_USERS = 'SET_USERS';
export const SHOW_APPS = 'SHOW_APPS';
export const CLOSE_APPS = 'CLOSE_APPS';

export const getAllUsersAction = (data) => ({
  type: SET_USERS,
  payload: data,
});

export const showAppsAction = (data) => ({
  type: SHOW_APPS,
  payload: data,
});

export const closeAppAction = () => ({
  type: CLOSE_APPS,
});

export const getAllUsersDispatch = () => (dispatch) => {
  let users = [];
  db.ref('/users/')
    .once('value')
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        users.push(doc.val());
      });
    })
    .then(() => {
      dispatch(getAllUsersAction(users));
    })
    .catch((err) => console.log(err));
};

export const showAppsDispatch = (id) => (dispatch) => {
  let apps = [];
  db.ref(`/accounts/${id}/apps`)
    .once('value')
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        apps.push(doc.val());
      });
    })
    .then(() => {
      dispatch(showAppsAction(apps));
    })
    .catch((err) => console.log(err));
};

export const rateAppDispatch = (id, rating) => (dispatch) => {
  let docName = null;
  db.ref(`/accounts/${id}/apps/`)
    .once('value')
    .then((snapshot) => {
      docName = Object.keys(snapshot.val()).toString();
    })
    .then(() => {
      db.ref(`/accounts/${id}/apps/${docName}`).update({ rating: rating });
    })
    .catch((err) => console.log(err));
};
