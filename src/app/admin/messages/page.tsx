"use client";

import { useEffect, useState } from "react";

type Message = {
  id: string | number;
  subject: string;
  email: string;
  phone?: string;
  message: string;
  service?: string;
  createdAt: string | number | Date;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch("/api/admin/messages");
        if (response.ok) {
          const result = await response.json();
          setMessages((result.data as Message[]) || []);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading messages...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600 mt-2">
          View and respond to contact form messages
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <p className="text-gray-600">No messages found.</p>
          <p className="text-sm text-gray-500 mt-2">
            Messages from the contact form will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message: Message) => (
            <div
              key={message.id}
              className="bg-white rounded-lg shadow p-6 border-l-4 border-amber-600"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {message.subject}
                  </h3>
                  <p className="text-sm text-gray-600">{message.email}</p>
                  {message.phone && <p className="text-sm text-gray-500">{message.phone}</p>}
                </div>
                <span className="text-sm text-gray-500">{new Date(message.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-700">{message.message}</p>
              {message.service && (
                <p className="text-sm text-gray-600 mt-2">Service: {message.service}</p>
              )}
              <button className="mt-4 text-amber-600 hover:text-amber-800 text-sm font-medium">
                Reply
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

