import React, { useState } from "react";
import { Form } from "./form.jsx";
export function Button(){

  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    // 👇️ toggle shown state
    setIsShown(current => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

return(
<div>
  <button class="button" onClick={handleClick}>Click</button>

  {isShown && <Form />}
</div>);
}
