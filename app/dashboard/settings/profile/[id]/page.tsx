"use client";

import React from "react";

type userParams = {
  params: {
    id: string;
  };
};

export default async function userProfile({ params }: userParams) {
  function fakeAsyncOperation(data, delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success with a resolved promise
        // You can modify this logic as needed
        if (Math.random() < 0.8) {
          resolve(`Success! Received: ${data}`);
        } else {
          reject(new Error(`Failed! Received: ${data}`));
        }
      }, delay);
    });
  }
  const handleFakeAsync = async () => {
    const res = await fakeAsyncOperation("Hello, Promise!", 2000);
    console.log(res);
  };
  const res = await handleFakeAsync();
  return <div>This is the user with the id of : {params.id}</div>;
}
