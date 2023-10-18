import * as React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

interface PropTypes {
  handleChange: (file: File) => void;
  isLoading: boolean;
}

const FileUploader = (props: PropTypes) => {
  const { isLoading, handleChange } = props;

  const onChange = async (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.files?.length) {
      const currentFile = event.currentTarget.files[0];
      handleChange(currentFile);
    }
  };

  return (
    <div className="file-upload">
      {(!isLoading && (
        <div className="file-upload__header">
          <div className="file-upload__body">
            <label className="file-upload__label">
              <span>Upload Profile Picture</span>
              <input
                name="keywords"
                type="file"
                data-test-id="file-upload-input"
                className="file-upload__input"
                onChange={onChange}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
        </div>
      )) || <ClipLoader aria-label="application-loader" />}
    </div>
  );
};

export default FileUploader;
