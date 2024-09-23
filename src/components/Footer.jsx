import React from "react";
export default function Footer() {
  return (
    <div className="flex flex-col sm:w-[100%] w-[95vw] sm:min-h-[50vh] bg-gray-50 text-gray-600 justify-center gap-6 items-center border-t-2 sm:py-7 py-5">
      <div className="hidden sm:flex justify-between w-[93vw] text-[12px] mt-3">
        <div className="flex flex-col gap-2 max-w-[15vw]">
          <p className="font-bold">Buy</p>
          <p>Registration</p>
          <p>Bidding & buying help</p>
          <p>Stores</p>
          <p>eBay for Charity</p>
          <p>Seasonal Sales and events</p>
          <p>eBay Gift Cards</p>
        </div>
        <div className="flex flex-col max-w-[15vw] gap-4">
          <div className="space-y-2">
            <p className="font-bold">Sell</p>
            <p>Start selling</p>
            <p>How to sell</p>
            <p>Business sellers</p>
            <p>Affiliates</p>
          </div>
          <div className="space-y-2">
            <p className="font-bold">Tools & apps</p>
            <p>Developers</p>
            <p>Security center</p>
            <p>Site map</p>
          </div>
        </div>
        <div className="flex flex-col max-w-[15vw] gap-4">
          <div className="space-y-2">
            <p className="font-bold">eBay companies</p>
            <p>TCGplayer</p>
          </div>
          <div className="space-y-2">
            <p className="font-bold">Stay connected</p>
            <p>Facebook</p>
            <p>Twitter</p>
          </div>
        </div>
        <div className="flex flex-col max-w-[15vw] gap-2">
          <p className="font-bold">About eBay</p>
          <p>Company info</p>
          <p>News</p>
          <p>Deferred prosecution Agreement with District of Massachusetts</p>
          <p>Investors</p>
          <p>Careers</p>
          <p>Diversity & inclusion</p>
          <p>Global Impact</p>
          <p>Government relations</p>
          <p>Advertise with us</p>
        </div>
        <div className="flex flex-col max-w-[15vw] gap-4">
          <div className="space-y-2">
            <p className="font-bold">Help & Contact</p>
            <p>Seller Center</p>
            <p>Contact us</p>
            <p>eBay returns</p>
            <p>eBay money back guarantee</p>
          </div>
          <div className="space-y-2">
            <p className="font-bold">Community</p>
            <p>Announcements</p>
            <p>eBay Community</p>
            <p>eBay for Business PodCast</p>
          </div>
        </div>
      </div>

      <div className="sm:mt-[2rem] my-4">
        <p className="text-[12px] mob textcenter text-gray-600 px-2">
          Copyright © 1995-2024 eBay Inc. All Rights Reserved. Accessibility,
          User Agreement, Privacy, Consumer Health Data, Payments Terms of Use,
          Cookies, CA Privacy Notice, Your Privacy Choices and AdChoice
        </p>
      </div>
    </div>
  );
}
