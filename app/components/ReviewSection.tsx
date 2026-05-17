"use client";
import { useEffect, useState } from "react";
import { LuStar } from "react-icons/lu";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export default function ReviewSection({ productSlug }: { productSlug: string }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/reviews?slug=${productSlug}`)
      .then((r) => r.json())
      .then((d) => setReviews(d.reviews ?? []));
  }, [productSlug]);

  const handleSubmit = async () => {
    if (!comment.trim() || !user) return;
    setSubmitting(true);
    setError("");
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productSlug, name: user.name || user.email, rating, comment }),
    });
    const data = await res.json();
    if (data.review) {
      setReviews((prev) => [data.review, ...prev]);
      setComment("");
      setRating(5);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError("Failed to submit review. Please try again.");
    }
    setSubmitting(false);
  };

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div id="reviews" className="mt-16 border-t border-neutral-200 pt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-neutral-900">Customer Reviews</h2>
        {avgRating && (
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {[1,2,3,4,5].map((s) => (
                <LuStar key={s} className={`h-5 w-5 ${s <= Math.round(Number(avgRating)) ? "fill-current" : ""}`} />
              ))}
            </div>
            <span className="font-bold text-neutral-900">{avgRating}</span>
            <span className="text-neutral-500 text-sm">({reviews.length} reviews)</span>
          </div>
        )}
      </div>

      {/* Write a review */}
      <div className="bg-neutral-50 rounded-2xl p-6 mb-10">
        <h3 className="font-semibold text-neutral-900 mb-4">Write a Review</h3>
        {!user ? (
          <div className="text-center py-4">
            <p className="text-neutral-500 text-sm mb-3">You must be logged in to leave a review.</p>
            <Link href="/login" className="rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-neutral-700 transition-colors">
              Sign In to Review
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              Reviewing as <span className="font-semibold text-neutral-900">{user.name || user.email}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm text-neutral-600 mr-2">Rating:</span>
              {[1,2,3,4,5].map((s) => (
                <button key={s} onMouseEnter={() => setHoveredStar(s)} onMouseLeave={() => setHoveredStar(0)} onClick={() => setRating(s)} className="focus:outline-none">
                  <LuStar className={`h-6 w-6 transition-colors ${s <= (hoveredStar || rating) ? "fill-yellow-400 text-yellow-400" : "text-neutral-300"}`} />
                </button>
              ))}
            </div>
            <textarea
              placeholder="Share your experience with this product..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-600 resize-none"
            />
            {success && <p className="text-green-600 text-sm font-medium">Review submitted successfully!</p>}
            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
            <button
              onClick={handleSubmit}
              disabled={submitting || !comment.trim()}
              className="rounded-full bg-neutral-900 px-8 py-2.5 text-sm font-semibold text-white hover:bg-neutral-700 disabled:opacity-50 transition-colors"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        )}
      </div>

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <p className="text-neutral-400 text-sm text-center py-8">No reviews yet. Be the first to review this product!</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((r) => (
            <div key={r.id} className="border-b border-neutral-100 pb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-accent-600 flex items-center justify-center text-white font-bold text-sm">
                    {r.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 text-sm">{r.name}</p>
                    <p className="text-neutral-400 text-xs">
                      {new Date(r.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </div>
                </div>
                <div className="flex text-yellow-400">
                  {[1,2,3,4,5].map((s) => (
                    <LuStar key={s} className={`h-4 w-4 ${s <= r.rating ? "fill-current" : "text-neutral-200"}`} />
                  ))}
                </div>
              </div>
              <p className="text-neutral-600 text-sm leading-relaxed pl-12">{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}