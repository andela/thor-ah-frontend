import React from 'react';

// components
import UserBio from '../components/UserBio/UserBio';
import UserProfiletabs from '../components/UserProfileTabs/UserProfileTabs';

const ProfilePage = () => (
  <div className='user-profile' style={{ paddingTop: '0px' }}>
    <UserBio />
    <UserProfiletabs />
  </div>
)

export default ProfilePage;
