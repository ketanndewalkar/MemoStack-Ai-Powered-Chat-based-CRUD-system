import React, { useState } from "react";
import { MessageSquareQuote, Plus, X, Send, Sparkles } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitTestimonialApi } from "./Handler/FetchDashboardHandler";
import toast from "react-hot-toast";

const TestimonialsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {[1, 2].map((i) => (
      <div key={i} className="p-4 bg-gray-50 rounded-xl animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
          <div className="space-y-1.5 flex-1">
            <div className="h-3.5 bg-gray-200 rounded w-1/3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const TestimonialsSetup = ({ data, isPending }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    message: "",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: submitTestimonialApi,
    onSuccess: (res) => {
      toast.success(res?.message || "Testimonial submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      setIsModalOpen(false);
      setFormData({
        name: "",
        role: "",
        message: "",
      });
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "Failed to submit testimonial"
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.message.trim()) {
      toast.error("Please enter your feedback/message");
      return;
    }
    mutation.mutate(formData);
  };

  const testimonialsList = Array.isArray(data) ? data : [];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <MessageSquareQuote className="w-5 h-5 text-cyan-600" />
          <h3 className="font-semibold text-gray-800">
            Community Testimonials
          </h3>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-medium px-3.5 py-2 rounded-lg transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </button>
      </div>

      {isPending ? (
        <TestimonialsSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonialsList.map((item, index) => (
            <div
              key={item._id || index}
              className="p-4 bg-gray-50/80 rounded-xl border border-gray-100 hover:border-cyan-100 transition-all flex flex-col justify-between"
            >
              <div>
                <p className="text-sm text-gray-600 leading-relaxed italic">
                  "{item.message}"
                </p>
              </div>

              <div className="mt-4 flex items-center gap-3 pt-3 border-t border-gray-200/60">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white flex items-center justify-center text-xs font-semibold shrink-0">
                  {item.name ? item.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.role || "MemoStack User"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-500" />
                <h4 className="font-semibold text-gray-900 text-base">
                  Share Your Feedback
                </h4>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex Johnson"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Your Role / Profession
                </label>
                <input
                  type="text"
                  placeholder="e.g. Developer, Student, Designer"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Feedback & Testimonial <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How has MemoStack helped you stay organized and manage your notes?"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 resize-none"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="flex items-center gap-1.5 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 text-white text-xs font-medium rounded-lg transition-colors shadow-xs"
                >
                  {mutation.isPending ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Submit Testimonial
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsSetup;