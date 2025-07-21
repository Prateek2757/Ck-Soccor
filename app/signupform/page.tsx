"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { supabase } from "../../lib/dbconnect/route";

export default function SoccerRegistrationForm() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const containsNumber = (str: string) => /\d/.test(str);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    const form = e.currentTarget;
    try {
      const formData = new FormData(form);
      const player_full_name = formData.get("player_full_name") as string;
      const date_of_birth = formData.get("date_of_birth") as string;
      const parent_full_name = formData.get("parent_full_name") as string;
      ``;
      const address = formData.get("address") as string;
      const contact_number = formData.get("contact_number") as string;
      const reason = formData.get("reason") as string;
      const term_program = formData.get("term_program") as string;
      const current_club = formData.get("current_club") as string;
      const reason_join = formData.get("reason_join") as string;
      const hear_about = formData.get("hear_about") as string;
      const suburb = formData.get("suburb") as string;
      const medical = formData.get("medical") as string;

      // Validation
      if (
        player_full_name.trim().length < 3 ||
        containsNumber(player_full_name)
      ) {
        setErrorMsg(
          "Player's name must be at least 3 letters and contain no numbers."
        );
        setLoading(false);
        return;
      }

      if (
        parent_full_name.trim().length < 3 ||
        containsNumber(parent_full_name)
      ) {
        setErrorMsg(
          "Parent's name must be at least 3 letters and contain no numbers."
        );
        setLoading(false);
        return;
      }

      if (address.trim().length < 3) {
        setErrorMsg("Address must be at least 3 characters.");
        setLoading(false);
        return;
      }

      if (!/^\d+$/.test(contact_number)) {
        setErrorMsg("Contact number must contain only numbers.");
        setLoading(false);
        return;
      }

      if (contact_number.length < 10) {
        setErrorMsg("Contact number must be at least 10 digits.");
        setLoading(false);
        return;
      }

      // Save to Supabase
      // Save to Supabase with corrected column names
      const { error } = await supabase
        .from("soccer_program_registration")
        .insert([
          {
            player_full_name,
            player_dob: date_of_birth,
            parent_full_name,
            full_address: address,
            contact_number,
            reason_to_join: reason,
            term2_package: term_program,
            currently_playing_club: current_club,
            short_reason: reason_join,
            referral_source: hear_about,
            suburb_preference: suburb,
            medical_conditions: medical,
            registration_date: new Date().toISOString().split("T")[0], // if your DB requires this
          },
        ]);

      if (error) {
        console.error("Supabase error:", error);
        setErrorMsg("Database error: " + error.message);
      } else {
        setSuccessMsg("🎉 Registration submitted successfully!");
        form.reset();
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrorMsg(
        "Network error or server is unreachable. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-black px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-6xl font-extrabold text-primary-foreground tracking-tight leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400">
              CK SOCCER
            </span>
          </h1>
          <h2 className="text-3xl font-semibold text-primary-foreground/90">
            Registration Form
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto">
            Join our CK Soccer training program and take your game to the next
            level.
          </p>
        </div>

        <div className="bg-card rounded-2xl bg-gradient-to-b from-white via-white-900 to-black-100 shadow-2xl border border-border/20 p-8 backdrop-blur-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-card-foreground border-b border-border pb-2">
                Player Information
              </h3>

              <LabelInputContainer>
                <Label htmlFor="player_full_name">Player's Full Name *</Label>
                <Input
                  id="player_full_name"
                  name="player_full_name"
                  type="text"
                  required
                  className="h-12 text-base"
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="date_of_birth">Player's Date of Birth *</Label>
                <Input
                  id="date_of_birth"
                  name="date_of_birth"
                  type="date"
                  required
                  className="h-12 text-base"
                />
              </LabelInputContainer>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-card-foreground border-b border-border pb-2">
                Parent/Guardian Information
              </h3>

              <LabelInputContainer>
                <Label htmlFor="parent_full_name">Parent's Full Name *</Label>
                <Input
                  id="parent_full_name"
                  name="parent_full_name"
                  type="text"
                  required
                  className="h-12 text-base"
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="address">Full Address *</Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  required
                  className="h-12 text-base"
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="contact_number">Contact Number *</Label>
                <Input
                  id="contact_number"
                  name="contact_number"
                  type="tel"
                  required
                  className="h-12 text-base"
                />
              </LabelInputContainer>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-card-foreground border-b border-border pb-2">
                Program Details
              </h3>

              <LabelInputContainer>
                <Label htmlFor="reason">Reason to Join the Program *</Label>
                <select
                  name="reason"
                  id="reason"
                  required
                  className="h-12 w-full rounded-md border border-input bg-background px-3 text-base"
                >
                  <option value="">Select a reason</option>
                  <option>First Time Playing Soccer</option>
                  <option>Develop Basic Soccer Foundation Skills</option>
                  <option>Improve Basic Soccer Skills</option>
                  <option>Focus on becoming Elite player</option>
                </select>
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="term_program">Term 2 - Package Program *</Label>
                <select
                  name="term_program"
                  id="term_program"
                  required
                  className="h-12 w-full rounded-md border border-input bg-background px-3 text-base"
                >
                  <option value="">Select a program</option>
                  <option>Kick off Program for Beginners U4 - U9</option>
                  <option>Elite Group Coaching</option>
                  <option>
                    1on1 Coaching /Personalised Coach (Max 2 players)
                  </option>
                </select>
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="suburb">
                  Which Suburb Program suits you best?
                </Label>
                <select
                  name="suburb"
                  id="suburb"
                  className="h-12 w-full rounded-md border border-input bg-background px-3 text-base"
                >
                  <option value="">Select location</option>
                  <option>Glenroy - Saturday Morning</option>
                  <option>Mickleham - Saturday Morning</option>
                  <option>Wollert - Saturday Morning</option>
                  <option>Craigieburn - Wednesday Evening (in progress)</option>
                </select>
              </LabelInputContainer>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-card-foreground border-b border-border pb-2">
                Additional Information
              </h3>

              <LabelInputContainer>
                <Label htmlFor="current_club">
                  Is your kid currently playing from any club?
                </Label>
                <Input
                  id="current_club"
                  name="current_club"
                  type="text"
                  className="h-12 text-base"
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="reason_join">
                  Why do you want to join the program?
                </Label>
                <Input
                  id="reason_join"
                  name="reason_join"
                  type="text"
                  className="h-12 text-base"
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="hear_about">How did you hear about us?</Label>
                <Input
                  id="hear_about"
                  name="hear_about"
                  type="text"
                  className="h-12 text-base"
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="medical">
                  Any known medical conditions or allergies?
                </Label>
                <Input
                  id="medical"
                  name="medical"
                  type="text"
                  className="h-12 text-base"
                />
              </LabelInputContainer>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 text-primary focus:ring-primary border-border rounded"
                />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I confirm my child is fit to participate and I agree to the
                  consent, waiver and terms. I understand all payments are
                  non-refundable.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                className="group relative w-full h-14 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                type="submit"
                disabled={loading}
              >
                <span className="relative z-10">
                  {loading ? "Submitting..." : "Register Now →"}
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
            {successMsg && (
              <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg">
                <p className="text-green-800 text-center font-medium">
                  {successMsg}
                </p>
              </div>
            )}
            {errorMsg && (
              <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-center font-medium">
                  {errorMsg}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-3", className)}>
      {children}
    </div>
  );
};
