import React from "react";

interface FormDistractionProps {
  header: string;
  description: string;
}

const FormDistraction = ({ header, description }: FormDistractionProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-7">
      <div className="grid grid-cols-3 grid-rows-3 gap-6">
        <div className="w-22 h-22 bg-main_dark rounded-lg even:bg-spec-1-dark even:animate-pulse"></div>
        <div className="w-22 h-22 bg-main_dark rounded-lg even:bg-spec-1-dark even:animate-pulse"></div>
        <div className="w-22 h-22 bg-main_dark rounded-lg even:bg-spec-1-dark even:animate-pulse"></div>
        <div className="w-22 h-22 bg-main_dark rounded-lg even:bg-spec-1-dark even:animate-pulse"></div>
        <div className="w-22 h-22 bg-main_dark rounded-lg even:bg-spec-1-dark even:animate-pulse"></div>
        <div className="w-22 h-22 bg-main_dark rounded-lg even:bg-spec-1-dark even:animate-pulse"></div>
        <div className="w-22 h-22 bg-main_dark rounded-lg even:bg-spec-1-dark even:animate-pulse"></div>
        <div className="w-22 h-22 bg-main_dark rounded-lg even:bg-spec-1-dark even:animate-pulse"></div>
        <div className="w-22 h-22 bg-main_dark rounded-lg even:bg-spec-1-dark even:animate-pulse"></div>
      </div>
      <div className="text-center">
        <h1 className="text-lg text-label-text font-semibold">{header}</h1>
        <p className="text-lg text-label-text">{description}</p>
      </div>
    </div>
  );
};

export default FormDistraction;
