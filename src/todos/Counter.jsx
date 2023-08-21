import useCounter from "../hooks/useCounter";

const Counter = () => {

   const [count , increment , decrement , reset] = useCounter(5 , 5);

   return (
      <div className="text-center my-3">
         <h5>{count}</h5>
         <button className="btn btn-success" onClick={increment}>افزایش</button>
         <button className="btn btn-danger" onClick={decrement}>کاهش</button>
         <button className="btn btn-warning" onClick={reset}>ریست</button>
      </div>
   )
}

export default Counter;