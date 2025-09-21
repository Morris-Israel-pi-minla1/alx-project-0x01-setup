import React, { useState } from "react";
import { UserModalProps, UserData } from "@/interfaces";

const UserModal: React.FC<UserModalProps> = ({ user, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<UserData>(user);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Deep update for nested objects (address, company)
    setFormData((prev) => {
      if (name.startsWith("address.")) {
        const key = name.replace("address.", "") as keyof UserData["address"];
        return { ...prev, address: { ...prev.address, [key]: value } };
      }
      if (name.startsWith("company.")) {
        const key = name.replace("company.", "") as keyof UserData["company"];
        return { ...prev, company: { ...prev.company, [key]: value } };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold mb-4 text-center">Add New User</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
          {/* Basic Info */}
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />

          <label className="text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />

          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />

          <label className="text-sm font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />

          <label className="text-sm font-medium">Website</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />

          {/* Company Info */}
          <label className="text-sm font-medium">Company Name</label>
          <input
            type="text"
            name="company.name"
            value={formData.company.name}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />

          <label className="text-sm font-medium">Catch Phrase</label>
          <input
            type="text"
            name="company.catchPhrase"
            value={formData.company.catchPhrase}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />

          {/* Address Info */}
          <label className="text-sm font-medium">Street</label>
          <input
            type="text"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />

          <label className="text-sm font-medium">Suite</label>
          <input
            type="text"
            name="address.suite"
            value={formData.address.suite}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />

          <label className="text-sm font-medium">City</label>
          <input
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />

          <label className="text-sm font-medium">Zipcode</label>
          <input
            type="text"
            name="address.zipcode"
            value={formData.address.zipcode}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition mt-2"
          >
            Save User
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
