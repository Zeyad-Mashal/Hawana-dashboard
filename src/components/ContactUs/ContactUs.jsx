import React, { useState, useEffect } from "react";
import "./ContactUs.css";
import getContact from "../../Api/getContact.api";
const ContactUs = () => {
  useEffect(() => {
    getAllContactApi();
  }, []);
  const [contactLoading, setContactLoading] = useState(false);
  const [contactError, setContactError] = useState("");
  const [allContact, setAllContact] = useState([]);
  const getAllContactApi = () => {
    getContact(setAllContact, setContactLoading, setContactError);
  };
  return (
    <div className="contact">
      <div className="contact_container">
        {contactLoading ? (
          <span class="loader"></span>
        ) : contactError ? (
          <h4>{contactError}</h4>
        ) : (
          <div className="contact_list">
            {allContact.map((item) => {
              return (
                <div className="contact_item" key={item._id}>
                  <h3>اسم العميل: {item.userName}</h3>
                  <h5>البريد الالكتروني: {item.email}</h5>
                  <h4>رقم الهاتف: {item.phoneNumber}</h4>
                  <p>
                    <span>رسالة العميل:</span> <tr />
                    {item.message}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
