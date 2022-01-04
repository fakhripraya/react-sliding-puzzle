export const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export const getTimeRemaining = (endTime) => {
    const total = Date.parse(endTime) - Date.parse(new Date().toString())
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    //const hours = Math.floor((total / 1000 * 60 * 60) % 24);
    //const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
        total, minutes, seconds
    }
}

export const startTimer = (deadline, setTimer, intervalRef) => {
    let { total, minutes, seconds } = getTimeRemaining(deadline);
    if (total >= 0) {
        setTimer(
            (minutes > 9 ? minutes : '0' + minutes) + ':' +
            (seconds > 9 ? seconds : '0' + seconds)
        )
    } else {
        clearInterval(intervalRef.current)
    }
}

export const clearTimer = (endTime, setTimer, intervalRef, initialTime) => {
    setTimer(initialTime === null ? '00:00' : initialTime)
    if (intervalRef.current) clearInterval(intervalRef.current)
    const id = setInterval(() => {
        startTimer(endTime, setTimer, intervalRef)
    }, 1000)
    intervalRef.current = id
}

export const getDeadlineTime = (currentTime) => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + (typeof (currentTime) === 'undefined' ? 1201 : currentTime));
    return deadline
}