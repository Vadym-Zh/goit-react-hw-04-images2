import { ProgressBar } from 'react-loader-spinner';

const Loader = () => {
  return (
    <ProgressBar
      height="100"
      width="100%"
      ariaLabel="progress-bar-loading"
      wrapperStyle={{}}
      wrapperClass="progress-bar-wrapper"
      borderColor="#0047AB"
      barColor="#0047AB"
    />
  );
};

export default Loader;
