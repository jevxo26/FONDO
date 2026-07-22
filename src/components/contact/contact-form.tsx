"use client";

import { useState } from "react";
import { ContactInfoSidebar } from "./contact-info-sidebar";
import { ContactFormFields } from "./contact-form-fields";

export default function ContactMain() {
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="bg-background pb-16">
      <div className="wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <ContactInfoSidebar />
          <ContactFormFields formData={formData} onChange={handleInputChange} onSubmit={handleSubmit} />
        </div>
      </div>
    </section>
  );
}
