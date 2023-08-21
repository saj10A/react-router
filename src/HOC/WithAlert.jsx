import React, { useState } from "react";
import swal from "sweetalert";

const WithAlert = (MainComponent) => {

    const NewComponent = (props) => {

        const Confirm = (message) => {
            return swal({
                title: "حذف رکورد !",
                text: message,
                icon: "warning",
                buttons: ["خیر", "بله"],
                dangerMode: true
            })
        }
        const Alert = (message, icon) => {
            return swal(message, {
                icon: icon,
                buttons: "متوجه شدم"
            });
        }
        return (
            <>
              <h2>سلام بر شما</h2>
              <MainComponent {...props} Confirm={Confirm} Alert={Alert} />
            </>

        )
    }
    return NewComponent;
}

export default WithAlert;