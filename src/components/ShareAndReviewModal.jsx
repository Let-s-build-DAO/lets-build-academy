'use client'
import React, { useState } from "react";
import { FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { toast } from "react-toastify";
import { getFirestore, collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import firebase_app from "../firebase/config";
import { useRouter } from "next/navigation";
const db = getFirestore(firebase_app);

const ShareAndReviewModal = ({ open, onClose, title, courseId, userId }) => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { width, height } = useWindowSize();
    const router = useRouter();

    const handleSubmitReview = async () => {
        if (!reviewText.trim()) return toast.error("Please write a review before submitting.");
        if (!rating) return toast.error("Please select a rating.");

        try {
            setIsSubmitting(true);
            const reviewRef = doc(collection(db, `courses/${courseId}/reviews`));
            await setDoc(reviewRef, {
                userId,
                review: reviewText.trim(),
                rating,
                createdAt: serverTimestamp(),
            });

            toast.success("Thank you for your feedback! 🎉");
            setReviewSubmitted(true);
            setShowConfetti(true);

            // Stop confetti after 5 seconds
            setTimeout(() => setShowConfetti(false), 5000);
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("Failed to submit review. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            {/* 🎊 Confetti overlay */}
            {showConfetti && (
                <Confetti width={width} height={height} numberOfPieces={500} gravity={0.15} recycle={false} />
            )}

            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl text-center relative overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 hover:text-purple transition"
                >
                    ✕
                </button>

                <h2 className="text-3xl font-bold text-purple mb-4">🎉 Course Completed! 🎉</h2>

                {!reviewSubmitted ? (
                    <>
                        <p className="text-gray-600 text-lg mb-6">
                            We’d love to hear what you thought about this course.
                        </p>

                        {/* ⭐ Star Rating */}
                        <div className="flex justify-center gap-2 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`cursor-pointer text-3xl transition ${star <= rating ? "text-yellow-400" : "text-gray-300"
                                        }`}
                                >
                                    ★
                                </span>
                            ))}
                        </div>

                        {/* 📝 Review Textarea */}
                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Write your review here..."
                            className="w-full border border-gray-300 rounded-md p-3 text-sm mb-3 focus:outline-purple"
                            rows={4}
                        />

                        {/* 🚀 Submit Review */}
                        <button
                            onClick={handleSubmitReview}
                            disabled={isSubmitting}
                            className="bg-purple text-white px-6 py-3 rounded-full font-semibold hover:bg-purple/90 transition disabled:opacity-50"
                        >
                            {isSubmitting ? "Submitting..." : "Submit Review"}
                        </button>
                    </>
                ) : (
                    <>
                        {/* 🎉 Thank You + Share Section */}
                        <p className="text-gray-700 text-lg font-medium mb-6">
                            Thanks for sharing your thoughts on this course! 💜
                        </p>
                        <p className="text-gray-600 mb-4">Invite your friends to join:</p>

                        <div className="flex justify-center gap-8 my-4">
                            <a
                                href={`https://wa.me/?text=I just completed the "${title}" course! 🎓 Check it out: ${window.location.origin}/courses/${courseId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-600 hover:scale-110 transition-transform"
                            >
                                <FaWhatsapp size={40} />
                            </a>
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:scale-110 transition-transform"
                            >
                                <FaFacebook size={40} />
                            </a>
                            <a
                                href={`https://twitter.com/intent/tweet?text=I just completed the "${title}" course! 🚀%0AJoin me here: ${window.location.origin}/courses/${courseId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sky-500 hover:scale-110 transition-transform"
                            >
                                <FaTwitter size={40} />
                            </a>
                            <a
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.origin}/courses/${courseId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-700 hover:scale-110 transition-transform"
                            >
                                <FaLinkedin size={40} />
                            </a>
                        </div>

                        <button
                            onClick={() => {
                                onClose,
                                    router.push('/user/courses')
                            }}
                            className="mt-6 bg-purple text-white px-6 py-3 rounded-full font-semibold hover:bg-purple/90 transition"
                        >
                            Close
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ShareAndReviewModal;
