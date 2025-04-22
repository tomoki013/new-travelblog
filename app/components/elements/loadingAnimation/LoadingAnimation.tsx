const LoadingAnimation = () => {
    return (
        <div className="flex flex-col justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500 dark:border-gray-300"></div>
            <div className="mt-4 text-gray-600 dark:text-gray-400">Loading...</div>
        </div>
    );
}

export default LoadingAnimation;
