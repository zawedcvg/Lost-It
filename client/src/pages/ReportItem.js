import React, { useState } from "react";
import MetaTags from "react-meta-tags";
import ReportItemCSS from "../styles/ReportItemPage.module.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

function ReportItem() {

    const [item, setItem] = useState({
        name : "",
        isLost : true,
        img : [],
        date : "",
        location : "",
        description : "",
        err : "",
        success : ""
    });

    const {name, isLost, img, date, location, description} = item;

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setItem({ ...item, [name]: value, err: "", success: "" });
    };

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/listings/post", {
                name, date, location, description, isLost, img 
            });
            setItem({ ...item, err: "", success: res.data.msg });
            history.push("/listings");
        } catch (err) {
            err.response.data.msg &&
            setItem({ ...item, err: "", success: "" });
        }
    };

    return (
        <div className={ReportItemCSS.ReportItem}>
            <MetaTags>
                <meta charset="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, 
        initial-scale = 1.0"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <title>Report An Item</title>
            </MetaTags>
            <div className={ReportItemCSS.container}>
                <div className={ReportItemCSS.details}>
                    <h1>Report an Item</h1>
                    <form>
                        <label
                            className={ReportItemCSS.reportitem_label}
                            htmlFor="location">
                            Name that you can give the item : 
                            <input
                                className={`${ReportItemCSS.location} ${ReportItemCSS.reportitem_input}`}
                                name="name"
                                type="text"
                                value={name}
                                onChange={handleChangeInput}
                                required
                            />
                        </label>
                        <label
                            className={ReportItemCSS.reportitem_label}
                            htmlFor="location">
                            Approximate Location <br />
                            of the Item :
                            <input
                                className={`${ReportItemCSS.location} ${ReportItemCSS.reportitem_input}`}
                                name="location"
                                type="text"
                                value={location}
                                onChange={handleChangeInput}
                                required
                            />
                        </label>
                        <label
                            className={ReportItemCSS.reportitem_label}
                            htmlFor="description"
                        >
                            Description of the object :
                            <textarea
                                id="description"
                                className={ReportItemCSS.reportitem_textarea}
                                name="description"
                                onChange={handleChangeInput}
                                type="text"
                                required
                                value={description}
                            ></textarea>
                        </label>
                        <label
                            className={ReportItemCSS.reportitem_label}
                            htmlFor="date"
                        >
                            Date of Happening :
                            <input
                                type="date"
                                className={`${ReportItemCSS.date_found} ${ReportItemCSS.small} ${ReportItemCSS.reportitem_input}`}
                                name="date"
                                value={date}
                                required
                                onChange={handleChangeInput}
                            />
                        </label>
                    </form>
                    <button className={ReportItemCSS.btn} type="submit" onClick={handleSubmit}>Submit</button>
                    <span>or</span>
                    <button
                        onClick={(e) => history.push("/listings")}
                        className={ReportItemCSS.btn}
                    >
                        Go to listings
                    </button>
                </div>
                <img src="https://source.unsplash.com/random" alt="something" />
            </div>
        </div>
    );
}

export default ReportItem;
