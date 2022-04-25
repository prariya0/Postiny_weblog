import React from "react";
import ponystand from "../images/inhupony.png"
import "../css/newcat.css"
import GoBackBtn from "../components/gobackbtn";

export default function NewCat() {
    return (
        <div className="newcat">
            {/* <div className="backbtn">
                <a href="#" >&lt; back</a>
            </div> */}
            <GoBackBtn />
            <div className="choosecat">
                <h2>Choose interested category</h2>
            </div>
            <div className="ccdetail">
                <h4>choose<span className="yellow"> at least 1 category </span>
                    of article that you would like to read</h4>
            </div>              
            <div className="container">
            <form action="" id="choosecat">
                <label className="option_item">
                    <input type="checkbox" className="checkbox" />
                    <div className="option_inner">
                        <img alt="" src={ponystand}/>
                        <div className="name">Facebook</div>
                    </div>
                </label>
                <label className="option_item">
                    <input type="checkbox" className="checkbox" />
                    <div className="option_inner">
                        <img alt="" src={ponystand}/>
                        <div className="name">Facebook</div>
                    </div>
                </label>
                <label className="option_item">
                    <input type="checkbox" className="checkbox" />
                    <div className="option_inner">
                        <img alt="" src={ponystand}/>
                        <div className="name">Facebook</div>
                    </div>
                </label>
                <label className="option_item">
                    <input type="checkbox" className="checkbox" />
                    <div className="option_inner">
                        <img alt="" src={ponystand}/>
                        <div className="name">Facebook</div>
                    </div>
                </label>
                <label className="option_item">
                    <input type="checkbox" className="checkbox" />
                    <div className="option_inner">
                        <img alt="" src={ponystand}/>
                        <div className="name">Facebook</div>
                    </div>
                </label>
                <label className="option_item">
                    <input type="checkbox" className="checkbox" />
                    <div className="option_inner">
                        <img alt="" src={ponystand}/>
                        <div className="name">Facebook</div>
                    </div>
                </label>
                <label className="option_item">
                    <input type="checkbox" className="checkbox" />
                    <div className="option_inner">
                        <img alt="" src={ponystand}/>
                        <div className="name">Facebook</div>
                    </div>
                </label>
                <label className="option_item">
                    <input type="checkbox" className="checkbox" />
                    <div className="option_inner">
                        <img alt="" src={ponystand}/>
                        <div className="name">Facebook</div>
                    </div>
                </label>
                </form>
                
            </div>
            <div className="ponystand">
                <img alt="" src={ponystand}/>
                <button type="submit" form="choosecat">Start your journey</button>
            </div>
            
        </div>
    );
}




