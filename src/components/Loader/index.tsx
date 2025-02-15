const Loader = () => {
  return (
    <div className="flex fixed inset-0 h-screen items-center justify-center bg-white dark:bg-black z-9999">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default Loader;
