import { Link } from "react-router-dom";
import { Pencil, Trash2, Star } from "lucide-react";
import StatusBadge from "../../../shared/components/StatusBadge";

export default function ToursTable({ rows = [], onDelete }) {
  if (!rows.length) {
    return (
      <div className="admin-card p-8 text-center text-sm text-gray-500 bg-white">
        No tour packages found. Create your first tour.
      </div>
    );
  }

  const money = (n) =>
    n == null || n === "" ? "—" : "PKR " + Number(n).toLocaleString();

  return (
    <div className="admin-card overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-left text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">Tour</th>
              <th className="px-4 py-3 font-medium">Region</th>
              <th className="px-4 py-3 font-medium">Duration</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Difficulty</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id || row._id} className="border-b border-gray-100 hover:bg-gray-50/70">
                <td className="px-4 py-3">
                  <div className="flex items-start gap-2">
                    {row.featured ? (
                      <Star size={14} className="text-amber-500 mt-1 shrink-0" />
                    ) : null}
                    <div>
                      <div className="font-medium text-gray-900">{row.title}</div>
                      <div className="text-xs text-gray-500">{row.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700">{row.regionName}</td>
                <td className="px-4 py-3 text-gray-700">
                  {row.durationDays}D / {row.durationNights}N
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">
                    {money(row.discountPrice || row.price)}
                  </div>
                  {row.discountPrice ? (
                    <div className="text-xs text-gray-400 line-through">
                      {money(row.price)}
                    </div>
                  ) : null}
                </td>
                <td className="px-4 py-3 text-gray-700">{row.difficulty}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.status || "draft"} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      to={"/tours/" + (row.id || row._id) + "/edit"}
                      className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 hover:bg-white text-gray-600"
                    >
                      <Pencil size={14} /> Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => onDelete && onDelete(row)}
                      className="inline-flex items-center gap-1 rounded-lg border border-red-200 text-red-700 px-2.5 py-1.5 hover:bg-red-50"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}