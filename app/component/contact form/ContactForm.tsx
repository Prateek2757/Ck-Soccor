"use client";
import React, { useState } from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/lib/utils";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { supabase } from "../../../lib/dbconnect/route";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const socialLinks = [
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaYoutube, href: "#", label: "YouTube" },
    { icon: MdEmail, href: "mailto:test@example.com", label: "Email" },
    { icon: MdPhone, href: "tel:+1234567890", label: "Phone" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const form = e.currentTarget;

    try {
      const formData = new FormData(form);
      const first_name = formData.get("firstname")?.toString().trim() || "";
      const last_name = formData.get("lastname")?.toString().trim() || "";
      const email = formData.get("email")?.toString().trim() || "";
      const message = formData.get("message")?.toString().trim() || "";
     
      const containsNumber = (str: string) => /\d/.test(str);

      // ✅ Basic manual validation
      if (first_name.length < 2 || containsNumber(first_name)) {
        setErrorMsg("First name must be at least 2 characters and contain no numbers.");
        setLoading(false);
        return;
      }
      if (last_name.length < 2 || containsNumber(last_name)) {
        setErrorMsg("Last name must be at least 2 characters and contain no numbers.");
        setLoading(false);
        return;
      }
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        setErrorMsg("Please provide a valid email address.");
        setLoading(false);
        return;
      }
      if (message.length < 10) {
        setErrorMsg("Message must be at least 10 characters long.");
        setLoading(false);
        return;
      }

      const { error } = await supabase.from("contact_form").insert([
        {
          first_name,
          last_name,
          email,
          message,
        },
      ]);

      if (error) {
        console.error("Submission error:", error);
        setErrorMsg("Database error: " + error.message);
      } else {
        form.reset();
        setErrorMsg(null);
        alert("Thanks for contacting us!");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrorMsg("Network error or server is unreachable. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact" className="bg-gradient-to-tl from-black via-gray-900 to-green-900">
      <div className="text-center mb-6 animate-fade-in">
        <div className="inline-block relative">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-3 pt-6 relative z-10">
            Get In{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Touch
            </span>
          </h2>
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl rounded-full animate-pulse"></div>
        </div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Ready to begin your journey with Elite Football Club? Contact us today to learn more about our
          programs and start your path to{" "}
          <span className="text-gradient bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
            excellence
          </span>
          .
        </p>
      </div>
      <div className="shadow-input mx-auto w-full max-w-md rounded-none text-white p-2 md:rounded-2xl md:p-8 bg-black">
        <form className="my-8" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col text-white space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="firstname" className="text-white">
                First name
              </Label>
              <Input id="firstname" name="firstname" placeholder="Tyler" type="text" />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname" className="text-white">
                Last name
              </Label>
              <Input id="lastname" name="lastname" placeholder="Durden" type="text" />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email" className="text-white">
              Email Address
            </Label>
            <Input id="email" name="email" placeholder="projectmayhem@fc.com" type="email" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="message" className="text-white">
              Message
            </Label>
            <textarea
              id="message"
              name="message"
              placeholder="Your message..."
              className="w-full px-4 py-2 mt-1 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </LabelInputContainer>

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Contact Us →"}
            <BottomGradient />
          </button>

          {errorMsg && <p className="mt-4 text-red-500 text-center">{errorMsg}</p>}
        </form>
      </div>
      <footer className="py-12 mt-4 px-4 bg-gradient-to-br from-black via-gray-900 to-green-400 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-4">CKSOCCER Academy</h3>
          <p className="text-slate-400 mb-6">Developing champions on and off the field</p>
          <div className="flex justify-center space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="bg-gray-800 hover:bg-emerald-500 text-gray-300 hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
          <div className="flex justify-center mt-4 gap-8 text-slate-400 text-sm">
            <span>© {new Date().getFullYear()} Ck Soccer Academy</span>
            <span>•</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>;
};