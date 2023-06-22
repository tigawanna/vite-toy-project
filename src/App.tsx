import { useState } from "react";
import "./App.css";
import { AppWrapper } from "./components/root/AppWrapper";



function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="bg-primary min-h-screen">
  <AppWrapper>
  <div className="h-screen overflow-y-scroll  w-full flex items-center justify-center bg-red-900 text-9xl font-bold ">
  Main content
  </div>
    </AppWrapper>


    </div>


  );
}

export default App;
