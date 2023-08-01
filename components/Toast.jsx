// components/Toast.js
import React, { useState, useEffect } from 'react';
import { AiFillCheckCircle } from "react-icons/ai";

const Toast = ({ show, message }) => {
  return (
    <div className={`flex items-center toast ${show ? 'show' : ''}`}>
      <AiFillCheckCircle className="text-green-500 mr-2"/>
      <div className="toast-message">{message}</div>
    </div>
  );
};

export default Toast;
