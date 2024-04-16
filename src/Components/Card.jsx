import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Import Link
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Carat from "./Carat";

function Card(props) {
  // const { price } = props;
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPlanPrice, setSelectedPlanPrice] = useState(null); // Add state for selected plan's price
  const [selectedPlanName, setSelectedPlanName] = useState(null);
  const plans = [
    {
      name: "BASIC",
      price: 27,
      features: [
        "3250 API calls 🦋",
        "5000 API calls 🌻",
        "Best for personal or freelance 🙀",
        "5 Request Per Second Limit 🛫",
        "No Image Editing APIs ❌",
      ],
    },
    {
      name: "STANDARD",
      price: 300,
      features: [
        "3250 API calls 🦋",
        "5000 API calls 🌻",
        "Best for personal or freelance 🙀",
        "5 Request Per Second Limit 🛫",
        "No Image Editing APIs ✅",
      ],
    },
    {
      name: "PREMIUM",
      price: 500,
      features: [
        "3250 API calls 🦋",
        "5000 API calls 🌻",
        "Best for personal or freelance 🙀",
        "5 Request Per Second Limit 🛫",
        "No Image Editing APIs ✅",
      ],
    },
  ];

  const selectPlan = (planIndex) => {
    setSelectedPlan(planIndex);
    setSelectedPlanPrice(plans[planIndex].price);
    setSelectedPlanName(plans[planIndex].name); // Set selected plan's name
  };

  return (
    <>
      <h5 className="text">Our Premium Plans</h5>
      <p className="card-text">
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </p>
      <div className="card-container">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`card card-hover ${
              selectedPlan === index ? "selected" : ""
            }`}
            onClick={() => selectPlan(index)}
          >
            <h4 style={{ marginTop: "-10px" }}>{plan.name}</h4>
            <div className="px-10 cont">
              <span className="font-mono font-bold dark:text-white">
                ${plan.price}
              </span>
              <span className="text-lg font-bold text-gray-500 dark:text-gray-300">
                per month
              </span>
            </div>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <div className="list">
              <ul className="flex flex-col">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="relative list-item">
                    <span className="flex items-center">
                      <FontAwesomeIcon icon={faCheck} className="green-icon" />
                      <span className="dark:text-gray-300">{feature}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Link to Carat component */}
            {/* <Carat index={index} plans={plans} /> */}
            <Carat
              index={selectedPlan}
              plans={plans}
              amount={selectedPlanPrice}
              selectedPlanName={selectedPlanName} // Pass selectedPlanName as a prop
            />{" "}
            {/* Pass selected plan's price */}
          </div>
        ))}
      </div>
    </>
  );
}

export default Card;
