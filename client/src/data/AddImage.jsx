import React from 'react';
import { Widget } from '@uploadcare/react-widget';

const AddImage = ({ setPostImage }) => {
  return (
    <>
      <Widget
        publicKey="f5af59b361f5db7719a9"
        id="file"
        onFileSelect={(file) => {
          if (file) {
            file.progress((info) => {
              console.log('file progress: ', info.progress);
            });
            file.done((info) => {
              console.log('file uploaded: ', info.cdnUrl);
              setPostImage(info.cdnUrl);
              // navigate('/adminPanel');
              //   setInputs((prevState) => ({
              //     ...prevState,
              //     product_image: info.cdnUrl,
              //   }));
            });
          }
        }}
        onChange={(info) => {
          console.log('upload completed: ', info);
        }}
      />
    </>
  );
};

export default AddImage;
