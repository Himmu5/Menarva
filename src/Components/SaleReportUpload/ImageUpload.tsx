import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

type P = {
  UploadImage : (f:FormData)=>void;
}
const ImageUpload: React.FC<P> = ({ UploadImage }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);
  }, []);

  const uploadImage = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('salesImage', selectedFile);

    UploadImage(formData);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' as any, // Accept only image files
    multiple: false,    // Allow only one file to be uploaded at a time
  });

  return (
     <div className=" max-w-md mx-auto relative my-5 ">
      {selectedFile && <button
              onClick={uploadImage}
              className="bg-blue-500 absolute left-20 top-36 hover:bg-blue-700 text-white font-bold py-1  px-4 rounded-full"
            >
              Upload Image
            </button>}
      <div
        {...getRootProps()}
        className="bg-gray-200 flex flex-col border-2 border-dashed border-gray-400 rounded-lg p-4 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        {selectedFile ? (
          <>
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Selected"
              className=" max-h-40 mx-auto mb-2"
            />
            
          </>
        ) : (
          <div>
            <FiUpload className="text-4xl mx-auto mb-2" />
            <p className="text-gray-500">Drag & drop an image or click here to select one</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
