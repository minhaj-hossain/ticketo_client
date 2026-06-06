"use client";

import React from "react";
import { FaRegBell } from "react-icons/fa";

export default function OverviewPage() {
  // Static dataset for the event matrix table
  const eventsData = [
    { id: 1, name: "React Conf", tickets: 28, status: "approved" },
    { id: 2, name: "JS Summit", tickets: 14, status: "pending" },
    { id: 3, name: "Design Week", tickets: 0, status: "rejected" },
  ];

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white p-8">
      {/* HEADER BAR */}
      <header className="flex items-center justify-between border-b border-white/5 pb-5 mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-white transition cursor-pointer text-lg">
            <FaRegBell />
          </button>
          {/* Avatar circle placeholder */}
          <div className="w-8 h-8 rounded-full bg-[#1E3A5F] border border-blue-500/30 flex items-center justify-center text-xs font-semibold text-[#4A90E2] select-none">
            O
          </div>
        </div>
      </header>

      {/* ANALYTICS STAT CARDS GRID */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {/* Total Revenue */}
        <div className="bg-[#2A2927] border border-white/5 rounded-xl p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400">Total Revenue</p>
          <p className="text-3xl font-bold mt-2 text-white">$840</p>
        </div>

        {/* Events */}
        <div className="bg-[#2A2927] border border-white/5 rounded-xl p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400">Events</p>
          <p className="text-3xl font-bold mt-2 text-white">3</p>
        </div>

        {/* Tickets Sold */}
        <div className="bg-[#2A2927] border border-white/5 rounded-xl p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400">Tickets Sold</p>
          <p className="text-3xl font-bold mt-2 text-white">42</p>
        </div>
      </section>

      {/* EVENTS TABLE CONTAINER */}
      <section className="bg-[#2A2927] border border-white/5 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-slate-400 font-semibold bg-white/1">
                <th className="px-6 py-4 font-semibold">Event</th>
                <th className="px-6 py-4 font-semibold text-center">Tickets</th>
                <th className="px-6 py-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {eventsData.map((event) => (
                <tr
                  key={event.id}
                  className="hover:bg-white/2 transition-colors"
                >
                  {/* Event Name */}
                  <td className="px-6 py-4 font-bold text-white tracking-wide">
                    {event.name}
                  </td>
                  {/* Ticket Count */}
                  <td className="px-6 py-4 font-semibold text-center text-slate-200">
                    {event.tickets}
                  </td>
                  {/* Pill Status Flags */}
                  <td className="px-6 py-4 text-right">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-bold rounded-lg tracking-wide select-none ${
                        event.status === "approved"
                          ? "bg-[#1E3A1E] text-[#4ADE80]"
                          : event.status === "pending"
                            ? "bg-[#3A2E1E] text-[#FACC15]"
                            : "bg-[#3A1E1E] text-[#F87171]"
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
