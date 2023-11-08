import facebookLogo from "../images/social-media/facebook.png";
import instagramLogo from "../images/social-media/instagram.png";
import tiktokLogo from "../images/social-media/tiktok.png";
import cardLogo from "../images/social-media/card.png";
import React from "react";
function SocialMedia() {
    return (
        <>
        <hr className={"footer-hr"} />
    <div className={"info-div"}>
    <div className={"social-media-div"}>
        <p>SOCIAL MEDIA</p>
        <img alt={"facebook"} src={facebookLogo} />
        <img alt={"instagram"} src={instagramLogo} />
        <img alt={"tiktok"} src={tiktokLogo} />
    </div>
    <div className={"payment-methods-div"}>
        <p>PAYMENT METHODS</p>
        <img alt={"card"} src={cardLogo} />

    </div>
</div>
            </>
    )}

export default SocialMedia;