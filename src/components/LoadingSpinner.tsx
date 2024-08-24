const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex h-full w-full items-center  justify-center bg-slate-400/20">
      <div className="loading-spinner left-[50%] top-[40%]"></div>
    </div>
  );
};

export default LoadingSpinner;
