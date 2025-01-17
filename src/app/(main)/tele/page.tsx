"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

export default function CallTracker() {
  const { register, handleSubmit, reset } = useForm();
  const [responseMessage, setResponseMessage] = useState("");

  const onSubmit = async (data: any) => {
    try {
      const startTime = new Date(data.callStartTime).toISOString();
      const endTime = new Date(data.callEndTime).toISOString();
      const duration =
        (new Date(data.callEndTime).getTime() -
          new Date(data.callStartTime).getTime()) /
        1000;

      const response = await axios.post("/api/calltracker", {
        telecallerId: data.telecallerId,
        patientPhone: data.patientPhone,
        callStartTime: startTime,
        callEndTime: endTime,
        callDuration: duration,
        callResponse: data.callResponse,
      });
      setResponseMessage(response.data.message);
      reset();
    } catch (error: any) {
      setResponseMessage(
        "Error: " + (error.response?.data?.message || "Something went wrong")
      );
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Call Tracking</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Telecaller ID:</label>
          <input
            type="text"
            {...register("telecallerId", { required: true })}
            placeholder="Enter telecaller ID"
          />
        </div>
        <div>
          <label>Patient Phone:</label>
          <input
            type="tel"
            {...register("patientPhone", { required: true })}
            placeholder="Enter patient phone number"
          />
        </div>
        <div>
          <label>Call Start Time:</label>
          <input
            type="datetime-local"
            {...register("callStartTime", { required: true })}
          />
        </div>
        <div>
          <label>Call End Time:</label>
          <input
            type="datetime-local"
            {...register("callEndTime", { required: true })}
          />
        </div>
        <div>
          <label>Call Response:</label>
          <select {...register("callResponse", { required: true })}>
            <option value="Picked">Picked</option>
            <option value="Missed">Missed</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <button type="submit">Submit Call Details</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}
