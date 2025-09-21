"use client";

import { useState } from "react";

type Stream = {
  id: number;
  title: string;
  description: string;
  scheduledAt: string;
};

export default function StreamsPage() {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [form, setForm] = useState({ title: "", description: "", scheduledAt: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStream: Stream = {
      id: Date.now(),
      ...form,
    };
    setStreams([...streams, newStream]);
    setForm({ title: "", description: "", scheduledAt: "" });
  };

  const handleDelete = (id: number) => {
    setStreams(streams.filter((s) => s.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📺 Manage Streams</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-4 rounded-lg shadow-md mb-6 max-w-md"
      >
        <input
          type="text"
          placeholder="Stream Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="datetime-local"
          value={form.scheduledAt}
          onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          ➕ Add Stream
        </button>
      </form>

      {/* List */}
      <ul className="space-y-3">
        {streams.map((stream) => (
          <li
            key={stream.id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded"
          >
            <div>
              <h2 className="font-semibold">{stream.title}</h2>
              <p className="text-sm">{stream.description}</p>
              <span className="text-xs text-gray-600">
                Scheduled: {new Date(stream.scheduledAt).toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => handleDelete(stream.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
