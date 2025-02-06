import React from "react";

export default function page() {
  return (
    <div className="shadow-lg rounded-lg p-4 mt-5">
      <h1 className="text-center font-bold text-xl mb-4">About BuzzWeight</h1>

      <p className="mb-4">
        Welcome to <strong>BuzzWeight</strong>, your innovative solution for
        monitoring and managing weight, temperature, and humidity sensor data
        from your bee hive trailers. Designed with efficiency and precision in
        mind, BuzzWeight serves as a comprehensive dashboard to give you
        real-time insights into your sensor systems, as well as custom hardware
        solutions for monitoring.
      </p>

      <h2 className="font-bold text-lg mt-4">Our Mission</h2>
      <p className="mb-4">
        At BuzzWeight, we aim to empower businesses and individuals with
        accurate and reliable sensor data for their hives. Our mission is to
        simplify complex data management processes, enabling users to make
        informed decisions that enhance productivity and operational efficiency.
      </p>

      <h2 className="font-bold text-lg mt-4">What We Offer</h2>
      <ul className="list-disc ml-5 mb-4">
        <li>
          A user-friendly dashboard for real-time monitoring of weight,
          temperature, and humidity data.
        </li>
        <li>
          Comprehensive data aggregation for up to 5 trailers, with insights
          derived from 4 individual production scales, hive scale and weather
          station package per trailer.
        </li>
        <li>Minimalistic, responsive design tailored to your workflow.</li>
        <li>
          Custom manufacturing of weight measurement scales and weather
          monitoring solutions
        </li>
      </ul>

      <h2 className="font-bold text-lg mt-4">Why Choose BuzzWeight?</h2>
      <p className="mb-4">
        BuzzWeight stands out for its focus on simplicity, precision, and
        scalability. Whether you're managing a fleet of bee hive trailers or
        monitoring environmental conditions, BuzzWeight provides a dependable
        solution to handle your data effortlessly.
      </p>

      <h2 className="font-bold text-lg mt-4">Looking Ahead</h2>
      <p className="mb-4">
        We're committed to continuously improving BuzzWeight with new features,
        updates, and enhancements based on user feedback. Our vision is to make
        sensor data management accessible and efficient for everyone.
      </p>

      <h2 className="font-bold text-lg mt-4">Get in Touch</h2>
      <p className="mb-4">
        We'd love to hear from you! If you have any questions, suggestions, or
        feedback, feel free to reach out to us at{" "}
        <strong>i.ivanov@airsofia.com</strong> or through the{" "}
        <strong>Contact form</strong>.
      </p>

      <p className="text-center font-bold mt-4">
        Thank you for choosing BuzzWeight!
      </p>
    </div>
  );
}
