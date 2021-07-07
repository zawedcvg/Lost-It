import React from "react";
import MetaTags from "react-meta-tags";
import ReportItemCSS from "../styles/ReportItemPage.module.css";
import { useHistory } from "react-router-dom";

function ReportItem() {
    const history = useHistory();
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
                            htmlFor="location"
                        >
                            Approximate Location <br />
                            of the Item :
                            <input
                                type="text"
                                className={`${ReportItemCSS.location} ${ReportItemCSS.reportitem_input}`}
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
                            ></textarea>
                        </label>
                        <label
                            className={ReportItemCSS.reportitem_label}
                            htmlFor="date-found"
                        >
                            Date of Happening :
                            <input
                                type="date"
                                className={`${ReportItemCSS.date_found} ${ReportItemCSS.small} ${ReportItemCSS.reportitem_input}`}
                            />
                        </label>
                        <label
                            className={ReportItemCSS.reportitem_label}
                            htmlFor="time"
                        >
                            Approximate time :
                            <input
                                type="time"
                                className={`${ReportItemCSS.small} ${ReportItemCSS.reportitem_input}`}
                            />
                        </label>
                    </form>
                    <button className={ReportItemCSS.btn}>Submit</button>
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
