import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import TourForm from "../components/TourForm";
import { toursApi } from "../api/toursApi";

export default function TourEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initial, setInitial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) {
      toast.error("Missing tour id");
      navigate("/tours");
      return;
    }

    let alive = true;
    setLoading(true);

    toursApi
      .getById(id)
      .then((item) => {
        if (!alive) return;
        if (!item) {
          toast.error("Tour not found");
          navigate("/tours");
          return;
        }
        setInitial(item);
      })
      .catch((e) => {
        if (!alive) return;
        toast.error(e?.response?.data?.message || "Failed to load tour");
        navigate("/tours");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [id, navigate]);

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      const updated = await toursApi.update(id, values);
      toast.success("Tour package updated");
      setInitial(updated);
    } catch (e) {
      toast.error(e?.response?.data?.message || e.message || "Failed to update");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Loading tour from database...</div>;
  }

  if (!initial) {
    return (
      <div className="space-y-3">
        <div className="text-sm text-gray-500">Tour not found.</div>
        <Link to="/tours" className="text-emerald-700 text-sm">Back to tours</Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Edit tour package</h1>
          <p className="text-sm text-gray-500 mt-1">{initial?.title}</p>
        </div>
        <Link to="/tours" className="text-sm text-gray-600 hover:text-gray-900">
          Back to list
        </Link>
      </div>
      <TourForm initialValues={initial} onSubmit={onSubmit} submitting={submitting} />
    </div>
  );
}