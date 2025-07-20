// components/StepperForm.jsx
import { useState } from "react";

export default function StepperForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    concern: "",
    name: "",
    email: "",
    contact: "",
    address: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow z-10">
      <h2 className="text-xl font-semibold mb-4">Step {step}</h2>

      {step === 1 && (
        <div>
          <label className="block font-medium">Select Service</label>
          <select
            name="service"
            onChange={handleChange}
            className="w-full border p-2 rounded my-2"
          >
            <option value="">-- Choose --</option>
            <option value="washing">Washing</option>
            <option value="interior">Interior</option>
            <option value="paint">Paint Protection</option>
          </select>

          <label className="block font-medium">Concern</label>
          <input
            type="text"
            name="concern"
            onChange={handleChange}
            className="w-full border p-2 rounded my-2"
          />

          <button
            onClick={nextStep}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4 float-right"
          >
            Save and Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>

          <div className="mt-4 flex justify-between">
            <button onClick={prevStep} className="text-gray-500">← Back</button>
            <button onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded">Save and Continue</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <label className="block font-medium">Select Date</label>
          <input
            type="date"
            name="date"
            onChange={handleChange}
            className="border p-2 rounded my-2 w-full"
          />

          <div className="mt-4 flex justify-between">
            <button onClick={prevStep} className="text-gray-500">← Back</button>
            <button onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded">Save and Continue</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <label className="block font-medium">Select Time</label>
          <select
            name="time"
            onChange={handleChange}
            className="w-full border p-2 rounded my-2"
          >
            <option value="">-- Select Time --</option>
            <option value="9am">9:00 AM - 10:00 AM</option>
            <option value="11am">11:00 AM - 12:00 PM</option>
            <option value="2pm">2:00 PM - 3:00 PM</option>
          </select>

          <div className="mt-4 flex justify-between">
            <button onClick={prevStep} className="text-gray-500">← Back</button>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={() => alert("Appointment Booked!")}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
