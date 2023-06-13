import { useState } from "react";
import { Accordion } from "shadcn-fe-ui"
import {  Button  } from "shadcn-fe-ui/button"

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      Hello
      <br/>
      <Button variant="ghost" size="default" className="bg-accent">Click me</Button>
    </div>
  );
}

export default App;
