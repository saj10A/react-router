import React from "react";
import { createPortal } from "react-dom";

const Portal = () => {
    return createPortal(
        <div className="modal_base">
            <div className="modal_box">
                ریکت پورتال
            </div>
        </div> , 
        document.getElementById("portal-root")
    )
}

export default Portal;