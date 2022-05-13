import React from 'react'
import "../../css/pages_css/approverRole/approveModal.css"
import DropPicture from '@material-ui/icons/WallpaperRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

const ClaimModal = ({rejectToApprove, update, data, setOpenModal, setBlur, onImageChange, image, haveimg }) => {

    return (
        <div className="modalApprove">
            <div className="approveContainer">
                <div className="approveClose">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                            setBlur(false);
                    }}
                    >
                    ✕
                    </button>
                </div>
        
                <div className="title">
                    <h1>Claim Information</h1>
                </div>
                    
                <div className="body"> 
                <div className="upload">
                            <label className="img-frame">
                           
                            
                            {haveimg?
                            <div>
                            <CheckCircleRoundedIcon className="drop-picture" style={{marginLeft: "76px", fontSize: "60px", color: "green"}}/>
                            <br />
                            {"*" + image.name + "* was uploaded"}
                            </div>
                            :
                            <DropPicture className="drop-picture" style={{ fontSize: "70px" }} />
                        }
                    { !haveimg && "Drop your payment slip here" }
                    <input className="inputFile" type="file" name="rpticon" onChange={onImageChange} accept="image/*"></input>
                            </label>
                        </div>
                    <div className="info">
                            <p>Payment ID: <span className="data">{data.payment_id}</span></p>
                            <p>Username: <span className="data">{data.username}</span></p> 
                            <p>Amount money: <span className="data">{data.amount}฿</span></p>
                            {haveimg&& <div className="footer">
                                <button 
                                    className="approve"
                                    onClick={() => {
                                        if(data.status_id === 3){
                                            console.log("q");
                                            rejectToApprove(2,data);
                                        } else{
                                            console.log("b");
                                            update(2,data);
                                        }
                                        // then tranfer coin into 'that' user
                                        setOpenModal(false);
                                        setBlur(false);
                                    }}
                                >Approve</button>
                                <button 
                                    className="reject"
                                    onClick={() => {
                                        update(3,data);
                                        setOpenModal(false);
                                        setBlur(false);
                                    }}
                                >Reject</button>
                            </div>}
                    </div>
                    
                </div>
                    
            </div>
        </div>
    )
}

export default ClaimModal
