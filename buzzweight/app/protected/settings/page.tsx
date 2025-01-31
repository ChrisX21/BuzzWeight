import InviteUsers from "@/components/invite-users";
import React from "react";

export default function Settings() {
  return (
    <div>
      <h1 className="text-xl text-center">Global Settings</h1>
      <div className="mt-5 flex justify-start mr-auto">
        <InviteUsers />
      </div>
    </div>
  );
}
