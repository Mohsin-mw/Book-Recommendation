const Loading = () => {
    return (<div className="w-full bg-primary flex-row-center h-screen">
        <div className="h-full w-full flex items-center justify-center absolute z-10 bg-dark left-0 top-0">
            <span className="loading loading-infinity loading-lg text-primary"></span>
        </div>
    </div>)
}

export default Loading;