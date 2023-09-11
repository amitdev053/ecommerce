import React from 'react'

const DialogBox = () => {
 
  return (
  
    <>
    <div className="container-fluid dialog_container_fluid" id="confirmDialogBox">
        <div className="row dialog_row">
            <div className="col-12 dilaog_col">
            <div className="dialog_heading">Are You Sure Want To Delete?</div>
            <div className="dialog_action_btn d-flex align-items-center">
            <button className="btn btn-sm btn-primary" id="yesDialogBtn">Yes</button>
            <button className="btn btn-sm btn-danger" id="noDialogBtn">No</button>

            </div>
            </div>
        </div>
    </div>


    </>
  )
}

export default DialogBox