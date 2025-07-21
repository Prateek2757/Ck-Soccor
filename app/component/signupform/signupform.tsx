"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { supabase } from "../../../lib/dbconnect/route";// adjust your path if needed

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact_number: "",
    address: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const { firstname, lastname, email, contact_number, address, message } = formData;

    if (firstname.trim().length < 3) {
      setErrorMsg("First name must be at least 3 characters.");
      setLoading(false);
      return;
    }

    if (lastname.trim().length < 3) {
      setErrorMsg("Last name must be at least 3 characters.");
      setLoading(false);
      return;
    }

    if (address.trim().length < 3) {
      setErrorMsg("Address must be at least 3 characters.");
      setLoading(false);
      return;
    }

    if (!/^\d+$/.test(contact_number)) {
      setErrorMsg("Contact number must contain only digits.");
      setLoading(false);
      return;
    }

    if (contact_number.length < 10) {
      setErrorMsg("Australian phone numbers must be at least 10 digits.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.from("contact_form").insert([
        {
          first_name: firstname,
          last_name: lastname,
          email,
          message,
          contact_number,
          address,
        },
      ]);

      if (error) {
        console.error("Submission error:", error);
        setErrorMsg("Database error: " + error.message);
      } else {
        alert("Thanks for contacting us!");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          contact_number: "",
          address: "",
          message: "",
        });
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrorMsg("Network error or server is unreachable. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <LabelInputContainer>
          <Label>First Name *</Label>
          <Input
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className={cn(errorMsg?.includes("First name") && "border-red-500")}
            placeholder="Your first name"
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label>Last Name *</Label>
          <Input
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className={cn(errorMsg?.includes("Last name") && "border-red-500")}
            placeholder="Your last name"
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label>Email *</Label>
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Your email"
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label>Contact Number *</Label>
          <Input
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            placeholder="Mobile number"
            className={cn(
              (errorMsg?.includes("Contact number") || errorMsg?.includes("phone")) && "border-red-500"
            )}
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label>Address *</Label>
          <Input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Your address"
            className={cn(errorMsg?.includes("Address") && "border-red-500")}
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label>Message</Label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-base"
            placeholder="Write your message..."
          />
        </LabelInputContainer>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {errorMsg && (
          <p className="mt-4 text-center text-red-500 font-medium">{errorMsg}</p>
        )}
      </form>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("flex flex-col space-y-2", className)}>{children}</div>;
};