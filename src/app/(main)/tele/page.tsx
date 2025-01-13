"use client"
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

export default function CallInitiate() {
    const { register, handleSubmit, reset } = useForm();
    const [responseMessage, setResponseMessage] = useState("");

    const onSubmit = async (data:any) => {
        try {
            const response = await axios.post("/api/calltracker", {
                telecallerId: data.telecallerId,
                patientPhone: data.patientPhone,
                telecallerPhone: data.telecallerPhone,
            });
            setResponseMessage(response.data.message);
            reset(); // Reset form fields
        } catch (error:any) {
            setResponseMessage("Error: " + (error.response?.data?.message || "Something went wrong"));
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
            <h2>Initiate a Call</h2>
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
                    <label>Telecaller Phone:</label>
                    <input
                        type="tel"
                        {...register("telecallerPhone", { required: true })}
                        placeholder="Enter telecaller phone number"
                    />
                </div>
                <button type="submit">Initiate Call</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
}
