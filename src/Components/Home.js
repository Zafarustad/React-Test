import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAllUsersDispatch, showAppsDispatch } from '../Actions/dataAction';
import User from './User';
import AppModal from './AppModal';
import { Spinner } from 'reactstrap';

const Home = ({ data, getAllUsersDispatch, showAppsDispatch }) => {
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);

  useEffect(getAllUsersDispatch, []);

  const showApp = async (id) => {
    await showAppsDispatch(id);
    setId(id);
    toggleModal();
  };

  const toggleModal = () => {
    setModal(modal ? false : true);
  };

  const { users } = data;

  return (
    <>
      <h2 className='text-center mt-3'>Apps</h2>
      {users ? (
        <div className='d-flex flex-wrap align-items-center justify-content-center mt-2'>
          {users.map((user) => (
            <User user={user} showApp={showApp} key={user.account} />
          ))}
          <AppModal
            id={id}
            setId={setId}
            modal={modal}
            toggleModal={toggleModal}
          />
        </div>
      ) : (
        <div className='text-center'>
          <Spinner type='grow' color='primary' className='m-3' />
          <Spinner type='grow' color='secondary' className='m-3' />
          <Spinner type='grow' color='success' className='m-3' />
          <Spinner type='grow' color='danger' className='m-3' />
          <Spinner type='grow' color='warning' className='m-3' />
        </div>
      )}
    </>
  );
};

const mapStateToProps = ({ data }) => ({ data });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllUsersDispatch,
      showAppsDispatch,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
