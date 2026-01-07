import { Html } from "@react-email/components";
import * as React from "react";
import { withSubject } from "src/lib/utils";
// import { withSubject } from "../utils";

export default function CreateUserAccountOTPTemplate({
  full_name,
  otp,
}: {
  full_name: string;
  otp: string;
}) {
  return withSubject(
    <Html>
      <p>
        Hi, {full_name}, to verify your account, please use the following OTP.
      </p>

      <div className="text-xl">{otp}</div>

      <p>If you did not expect this email, you can safely ignore it.</p>

      <p>Cheers.</p>
    </Html>,
    `Verify your LinkTree Account`
  );
}