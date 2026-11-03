import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import TourForm from "../components/TourForm";
import { toursApi } from "../api/toursApi";

export default function TourCreatePage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      const created = await toursApi.create(values);
      toast.success("Tour package created");
      navigate("/tours/" + created.id + "/edit");
    } catch (e) {
      toast.error(e?.response?.data?.message || e.message || "Failed to create tour");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Add tour package</h1>
          <p className="text-sm text-gray-500 mt-1">Saved to MongoDB via backend API.</p>
        </div>
        <Link to="/tours" className="text-sm text-gray-600 hover:text-gray-900">
          Back to list
        </Link>
      </div>
      <TourForm onSubmit={onSubmit} submitting={submitting} />
    </div>
  );
}