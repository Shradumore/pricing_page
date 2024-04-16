import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import "./Carat.css";
import "./Card.jsx";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../FireBaseConfig/FireBaeConfig.jsx"; // Assuming "firebase.js" is where you export fireDB
import react from "@heroicons/react";

function Carat(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [nameError, setNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");

  const closeModal = () => {
    setIsOpen(false);
    document.querySelector(".card-container").classList.remove("blur");
    document.querySelector(".card-text").classList.remove("blur");
    document.querySelector(".text").classList.remove("blur");
  };

  const openModal = () => {
    setIsOpen(true);
    document.querySelector(".card-container").classList.add("blur");
    document.querySelector(".card-text").classList.add("blur");
    document.querySelector(".text").classList.add("blur");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name) {
      setNameError("Name is required");
    } else {
      setNameError("");
    }

    if (!address) {
      setAddressError("Address is required");
    } else {
      setAddressError("");
    }

    if (!pincode) {
      setPincodeError("*required");
    } else if (!/^\d{6}$/.test(pincode)) {
      setPincodeError("must be 6 digits");
    } else {
      setPincodeError("");
    }

    if (!mobileNumber) {
      setMobileNumberError("*required");
    } else if (!/^\d{10}$/.test(mobileNumber)) {
      setMobileNumberError("must be 10 digits");
    } else {
      setMobileNumberError("");
    }

    if (
      name &&
      address &&
      pincode &&
      /^\d{6}$/.test(pincode) &&
      mobileNumber &&
      /^\d{10}$/.test(mobileNumber)
    ) {
      // Perform form submission or any other action here
      closeModal();

      // Call buyNow function with selected plan's name
      buyNow();
    }
  };

  const buyNow = async () => {
    if (
      name === "" ||
      address === "" ||
      pincode === "" ||
      mobileNumber === ""
    ) {
      console.log("required");
      return;
    }

    //payment
    const { amount } = props; // Receive selected plan's price as prop

    const options = {
      key: "rzp_test_PLVvBZLj7DFX01",
      key_secret: "ARewn3U6NfQDylZtth4aKhOr",
      amount: amount * 100,
      currency: "INR",
      order_receipt: "order_rcptid_" + name,
      name: "AIServices",
      description: "for testing purpose",
      handler: async function (response) {
        console.log(response);
        // toast.success("Payment Successful");

        const paymentId = response.razorpay_payment_id;

        const orderInfo = {
          plan: props.selectedPlanName,
          addressInfo: {
            name,
            address,
            pincode,
            mobileNumber,
            date: new Date().toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          },

          // email: JSON.parse(localStorage.getItem("users")).user.email,
          // userid: JSON.parse(localStorage.getItem("users")).user.uid,
          paymentId,
        };

        try {
          const result = await addDoc(collection(fireDB, "orders"), orderInfo);
          console.log("Document written with ID: ", result.id);
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    const pay = new window.Razorpay(options);
    pay.open();
    console.log(pay);
  };

  return (
    <>
      <div className="text-center rounded-lg text-green font-bold io">
        <button
          className="btn middle-btn"
          id="btn"
          type="button"
          onClick={openModal}
        >
          Get Subscribe
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="content" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed" />
          </Transition.Child>

          <div>
            <div className="flex">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel>
                  <section>
                    <div>
                      <div>
                        <div>
                          <form className="Conten" onSubmit={handleSubmit}>
                            <div>
                              <label htmlFor="name">Enter Full Name</label>
                              <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className={nameError ? "error-border" : ""}
                              />
                              <p className="error">{nameError}</p>
                            </div>

                            <div>
                              <label htmlFor="email">Enter Full Address</label>
                              <input
                                type="text"
                                name="address"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                              />
                              <p className="error">{addressError}</p>
                            </div>

                            <div>
                              <label htmlFor="pincode">Enter Pincode</label>
                              <input
                                type="text"
                                name="pincode"
                                id="pincode"
                                pattern="[0-9]*"
                                maxLength="6"
                                value={pincode}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (/^\d*$/.test(value)) {
                                    setPincode(value);
                                    setPincodeError("");
                                  } else {
                                    setPincodeError("Please enter digits only");
                                  }
                                }}
                                required
                              />
                              {pincodeError && (
                                <p className="err-msg">{pincodeError}</p>
                              )}
                            </div>

                            <div>
                              <label htmlFor="mobileNumber" id="mobStyle">
                                Enter Mobile Number
                              </label>
                              <input
                                type="text"
                                name="mobileNumber"
                                id="mobileNumber"
                                pattern="[0-9]*"
                                maxLength="10"
                                value={mobileNumber}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (/^\d*$/.test(value)) {
                                    setMobileNumber(value);
                                    setMobileNumberError("");
                                  } else {
                                    setMobileNumberError(
                                      "Please enter digits only"
                                    );
                                  }
                                }}
                                required
                              />

                              {mobileNumberError && (
                                <p className="error-message">
                                  {mobileNumberError}
                                </p>
                              )}
                            </div>

                            <button
                              type="submit"
                              className="btn1"
                              // onClick={check}
                              onClick={buyNow}
                            >
                              Order Now
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </section>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default Carat;
