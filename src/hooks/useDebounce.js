
function useDebounce(cb,delay=2000)
{
    let timeId;
    return(... args) =>{
        clearTimeout(timeId)
        timeId = setTimeout(()=>{
            cb(... args)
        },delay)
    }
}

export default useDebounce