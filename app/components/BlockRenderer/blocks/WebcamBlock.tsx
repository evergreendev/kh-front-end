const webcamBlock = () => {
    const date = new Date();
    return <img className="mx-auto" src={`https://crazyhorsememorial.org/webcampics/deckcam.jpg?time=${date.getTime()}`} alt=""/>
}

export default webcamBlock;
