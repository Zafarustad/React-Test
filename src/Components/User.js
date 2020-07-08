import React from 'react';
import { Card, CardText, Button, CardImg, Fade } from 'reactstrap';

const User = ({ user, showApp }) => {
  return (
    <>
      <Fade in={true}>
        <Card body className='text-center m-3 shadow-lg rounded'>
          <CardImg
            top
            width='100%'
            src={`https://api.adorable.io/avatars/285/${user.name
              .split(' ')
              .join('')}@adorable.io.png`}
          />
          <div className='p-3'>
            <CardText>Username: -{user.name}</CardText>
            <CardText>Account: {user.account}</CardText>
          </div>
          <Button color='info' onClick={() => showApp(user.account)}>
            Show User Apps
          </Button>
        </Card>
      </Fade>
    </>
  );
};

export default User;
