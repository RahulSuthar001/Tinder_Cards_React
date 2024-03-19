import React from "react";
const CatImageScreen=({selectedCat,onBack})=>{
    return(
        
            <div>
              <button  onClick={onBack}>Back</button>
              <h1>Selected Cat Image</h1>
              <img src={`https://cataas.com/cat/${selectedCat}`} alt="Selected Cat" />
            </div>
    );

};
export default CatImageScreen;