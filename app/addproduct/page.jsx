"use client";

import { useState } from "react";

// ShadCN UI Components (Defined here for simplicity)
const Card = ({ children, className }) => (
  <div className={`bg-white shadow-lg rounded-2xl ${className}`}>{children}</div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-8 ${className}`}>{children}</div>
);

const Button = ({ children, onClick, type = "button", className, disabled }) => (
  <button
    onClick={onClick}
    type={type}
    disabled={disabled}
    className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors duration-300 ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
  >
    {children}
  </button>
);

const Input = ({ type, value, onChange, placeholder, className, accept }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    accept={accept}
    className={`border border-gray-300 rounded-lg w-full p-2 text-lg text-black ${className}`}
  />
);

const Textarea = ({ value, onChange, placeholder, className }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`border border-gray-300 rounded-lg w-full p-2 text-lg text-black ${className}`}
  />
);

const toast = ({ description }) => {
  alert(description);
};

const AddProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !description || !price || !image) {
      toast({ description: "Please fill in all the fields." });
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("image", image);

      const res = await fetch("/api/addproduct", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast({ description: "Product added successfully!" });
        setName("");
        setDescription("");
        setPrice("");
        setImage(null);
        setLoading(false);
      } else {
        toast({ description: data.error || "Something went wrong." });
      }
    } catch (error) {
      toast({ description: "An error occurred. Try again later." });
    } finally {
      
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-full max-w-2xl">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-2 text-black">Product Name</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2 text-black">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2 text-black">Price (in ₹)</label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2 text-black">Upload Image</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <Button type="submit" className="w-full mt-4 cursor-pointer" disabled={loading}>
              {loading ? "Uploading..." : "Add Product"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProductForm;
