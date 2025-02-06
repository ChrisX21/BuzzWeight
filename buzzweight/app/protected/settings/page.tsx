import InviteUsers from "@/components/invite-users";
import React from "react";

export default function Settings() {
  return (
    <div>
      <h1 className="text-xl text-center">Global Settings</h1>
      <div className="mt-5 flex justify-start mr-auto">
        <InviteUsers />
      </div>
      <h3 className="text-center mt-5 text-gray-400">
        More features coming soon...
      </h3>
    </div>
  );
}
