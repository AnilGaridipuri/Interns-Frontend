import React from 'react'

const AccountHeader = (props) => {
  return (
    <div>
      <div className="accountHeader">
        <p>{props.label}</p>
      </div>
    </div>
  );
}

export default AccountHeader