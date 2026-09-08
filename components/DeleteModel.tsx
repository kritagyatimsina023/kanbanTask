"use client";

import { AlertTriangle, Loader2, Trash2, X } from "lucide-react";

type DeleteModelProps = {
  open: boolean;
  title?: string;
  description?: string;
  itemName?: string;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
};

const DeleteModel = ({
  open,
  title = "Delete item?",
  description = "This action cannot be undone.",
  itemName,
  onClose,
  onConfirm,
  loading = false,
}: DeleteModelProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 px-4 backdrop-blur-md">
      {/* Backdrop */}{" "}
      <button
        type="button"
        aria-label="Close delete modal"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />
      {/* Modal */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 px-6! py-5!">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50">
              <AlertTriangle
                size={21}
                className="text-red-500"
                strokeWidth={2.2}
              />
            </div>

            <div>
              <h2 className="text-base font-semibold text-gray-900">{title}</h2>

              <p className="mt-1! text-xs text-gray-500">{description}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:pointer-events-none disabled:opacity-50"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6! py-5!">
          <p className="text-sm leading-6 text-gray-600">
            Are you sure you want to delete{" "}
            {itemName ? (
              <span className="font-semibold text-gray-900">
                &quot;{itemName}&quot;
              </span>
            ) : (
              "this item"
            )}
            ?
          </p>

          <p className="mt-2! text-xs text-gray-400">
            All associated data may also be permanently removed.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50/70 px-6! py-4!">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-gray-200 bg-white px-4! py-2! text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4! py-2! text-sm font-medium text-white shadow-sm transition hover:bg-red-700 disabled:pointer-events-none disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
