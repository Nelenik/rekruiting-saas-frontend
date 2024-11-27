import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "REkrutAI|Admin Panel",
};
const AdminPage = () => {
  return (
    <div>
      this is the admin main page
      <br />
      <Link href={'/admin/company'}>link to company</Link>
    </div>
  );
}

export default AdminPage;