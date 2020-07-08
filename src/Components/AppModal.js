import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import {
  closeAppAction,
  rateAppDispatch,
  showAppsDispatch,
} from '../Actions/dataAction';

const UserModal = ({
  data,
  modal,
  toggleModal,
  closeAppAction,
  id,
  setId,
  rateAppDispatch,
  showAppsDispatch,
}) => {
  const { userApps } = data;

  const [rating, setRating] = useState(0);

  const toggle = () => {
    toggleModal();
    setId(null);
    closeAppAction();
  };

  const handleRating = async (e) => {
    setRating(e.target.value);
    await rateAppDispatch(id, e.target.value);
    await showAppsDispatch(id);
  };

  return (
    userApps && (
      <>
        <Modal isOpen={modal} toggle={toggle} centered={true} size='sm'>
          <ModalHeader toggle={toggle} charCode='X'>
            Apps
          </ModalHeader>
          {userApps.map((app) => (
            <ModalBody
              key={app.title}
              className='text-center d-flex flex-column align-items-center'
            >
              <img
                width='auto'
                alt='app-icon'
                className='p-4 rounded'
                src='https://3.bp.blogspot.com/-d-RdcVoyCxw/W_1FOqLOyEI/AAAAAAAAAPg/FDBb4t2UMf0tPQ6xMhxlzKRpf-UYMe24QCLcBGAs/s1600/ic_launcher.png'
              />
              <div className='d-flex flex-column w-100'>
                <span className='font-weight-bold'>{app.title}</span>
                <span className='mt-3'>Rate the app</span>
                <span className='my-2'>Current Rating: {app.rating}/5</span>
                <input
                  type='range'
                  className='mt-3'
                  max={5}
                  min={0}
                  defaultValue={app.rating}
                  onMouseLeave={handleRating}
                />
              </div>
            </ModalBody>
          ))}
        </Modal>
      </>
    )
  );
};

const mapStateToProps = ({ data }) => ({ data });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      closeAppAction,
      rateAppDispatch,
      showAppsDispatch,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UserModal);
