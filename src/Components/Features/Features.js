// Librairies
import React from "react";
import '../Features/features.css';


// Components
import FeatureItem from "../FeatureItem/FeatureItem"

const features = [
  {
    title: "You are our #1 priority",
    icon: "../../Assets/icon-chat",
    iconAlt: "Chat Icon",
    description:
      " Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
  },
  {
    title: "More savings means higher rates",
    icon: "./img/icon-money.png",
    iconAlt: "Money Icon",
    description:
      "The more you save with us, the higher your interest rate will be!",
  },
  {
    title: "Security you can trust",
    icon: "./img/icon-security.png",
    iconAlt: "Security Icon",
    description:
      "We use top of the line encryption to make sure your data and money is always safe.",
  },
];

const Features = () => {
  return (
    <section className= "features">
      <h2 className="sr-only">Features</h2>

      {features.map((feature, index) => {
        return (
          <FeatureItem
            icon={feature.icon}
            iconAlt={feature.iconAlt}
            title={feature.title}
            description={feature.description}
            key={index}
          />
        );
      })}
    </section>
  );
};

export default Features;