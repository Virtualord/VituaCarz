import React from "react";

const EditModal = ({
  setEditModal,
  uname,
  setUname,
  phone,
  setPhone,
  password,
  setPassword,
  handleUpdate,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onClick={() => setEditModal(false)}
    >
      {/* Modal */}
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl border border-[#3f3f3f] bg-[#2f2f2f] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#3f3f3f] px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-[#ececec]">
              Manage Profile
            </h2>

            <p className="mt-1 text-sm text-[#a3a3a3]">
              Update your account information
            </p>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={() => setEditModal(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-xl text-[#a3a3a3] transition hover:bg-[#404040] hover:text-[#ececec]"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
          className="space-y-5 p-6"
        >
          {/* Username */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#ececec]">
              Username
            </label>

            <input
              type="text"
              value={uname}
              onChange={(e) => setUname(e.target.value)}
              placeholder="Enter your username"
              className="w-full rounded-xl border border-[#525252] bg-[#212121] px-4 py-3 text-sm text-[#ececec] placeholder-[#737373] outline-none transition focus:border-[#737373] focus:ring-1 focus:ring-[#737373]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#ececec]">
              Phone Number
            </label>

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full rounded-xl border border-[#525252] bg-[#212121] px-4 py-3 text-sm text-[#ececec] placeholder-[#737373] outline-none transition focus:border-[#737373] focus:ring-1 focus:ring-[#737373]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#ececec]">
              New Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full rounded-xl border border-[#525252] bg-[#212121] px-4 py-3 text-sm text-[#ececec] placeholder-[#737373] outline-none transition focus:border-[#737373] focus:ring-1 focus:ring-[#737373]"
            />

            <p className="mt-2 text-xs text-[#737373]">
              Leave blank if you don't want to change your password.
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#3f3f3f]" />

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setEditModal(false)}
              className="rounded-xl border border-[#525252] px-5 py-2.5 text-sm font-medium text-[#ececec] transition hover:bg-[#404040]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#ececec] px-5 py-2.5 text-sm font-semibold text-[#171717] transition hover:bg-white active:scale-[0.98]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
