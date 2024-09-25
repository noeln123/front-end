import React from 'react';

const GeneralManagment = () => {
  return (
    <div>
      <h2>General Management</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card bg-light mb-3">
            <div className="card-header">Total Users</div>
            <div className="card-body">
              <h5 className="card-title">1000 Users</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-light mb-3">
            <div className="card-header">Total Teachers</div>
            <div className="card-body">
              <h5 className="card-title">200 Teachers</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-light mb-3">
            <div className="card-header">Total Courses</div>
            <div className="card-body">
              <h5 className="card-title">150 Courses</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralManagment;
