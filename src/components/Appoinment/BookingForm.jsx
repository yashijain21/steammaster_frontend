import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = () => {
  const axios = useAxiosPublic();
  const navigate = useNavigate();

  const [allCategories, setAllCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [selectedParentId, setSelectedParentId] = useState("");

  const [allServices, setAllServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(null);

  const [bookedTimes, setBookedTimes] = useState([]);

  const totalPrice = selectedServices.reduce((acc, item) => acc + item.price, 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, serviceRes] = await Promise.all([
          axios.get("/categories"),
          axios.get("/services"),
        ]);
        setAllCategories(catRes.data);
        setAllServices(serviceRes.data);
        const parentCats = catRes.data.filter((cat) => !cat.parent);
        setParentCategories(parentCats);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedParentId) {
      const subcategoryIds = allCategories
        .filter((cat) => cat.parent === selectedParentId)
        .map((cat) => cat._id);
      const services = allServices.filter((svc) =>
        subcategoryIds.includes(svc.category)
      );
      setFilteredServices(services);
      setSelectedServices([]);
    }
  }, [selectedParentId, allCategories, allServices]);

  useEffect(() => {
    const fetchBookedTimes = async () => {
      if (!date) return;
      const selectedDate = date.toISOString().split("T")[0];
      try {
        const res = await axios.get(`/appointments?date=${selectedDate}`);
        const times = res.data.map((appt) => new Date(`${selectedDate}T${appt.appointmentTime}`));
        setBookedTimes(times);
      } catch (error) {
        console.error("Error fetching booked slots:", error);
      }
    };
    fetchBookedTimes();
  }, [date]);

  const handleServiceToggle = (service) => {
    const exists = selectedServices.find((s) => s._id === service._id);
    if (exists) {
      setSelectedServices((prev) => prev.filter((s) => s._id !== service._id));
    } else {
      setSelectedServices((prev) => [...prev, service]);
    }
  };

  const handleSubmit = async () => {
    const payload = {
      services: selectedServices.map((s) => s._id),
      totalPrice,
      appointmentDate: date.toISOString().split("T")[0],
      appointmentTime: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
    };

    try {
      const response = await axios.post("/appointments", payload);
      console.log("Appointment booked:", response.data);
      navigate("/thank-you"); // ✅ redirect
    } catch (err) {
      console.error("Error booking appointment:", err);
      alert("Error booking appointment.");
    }
  };

  const nextStep = () => {
    if (validateStep(step)) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const validateStep = (currentStep) => {
    switch (currentStep) {
      case 1:
        return !!selectedParentId;
      case 2:
        return selectedServices.length > 0;
      case 3:
        return name && phone && address && email && date;
      default:
        return true;
    }
  };

  const steps = [
    { id: 1, label: "Select Category" },
    { id: 2, label: "Select Services" },
    { id: 3, label: "Personal Info" },
    { id: 4, label: "Review & Confirm" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Step Indicator */}
      <div className="flex justify-between items-center relative mb-8">
        {steps.map((item, idx) => (
          <div key={item.id} className="flex-1 flex flex-col items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full z-10 border-4 ${
                step === item.id
                  ? "bg-secondary text-white border-secondary"
                  : step > item.id
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-500 border-gray-300"
              }`}
            >
              {item.id}
            </div>
            <span className="text-xs mt-2 text-center">{item.label}</span>
            {idx !== steps.length - 1 && (
              <div
                className={`absolute top-5 left-[calc(${(idx + 1) * 25}%)] h-1 w-[25%] ${
                  step > item.id ? "bg-primary" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold text-gray-700">Choose a Category</h2>
            <div className="flex flex-wrap gap-3">
              {parentCategories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setSelectedParentId(cat._id)}
                  className={`px-4 py-2 rounded-full border text-sm ${
                    selectedParentId === cat._id
                      ? "bg-secondary text-white border-secondary"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold text-gray-700">Select Services</h2>
            <div className="space-y-3">
              {filteredServices.map((svc) => (
                <label
                  key={svc._id}
                  className={`flex items-start gap-4 p-4 border rounded-md cursor-pointer ${
                    selectedServices.some((s) => s._id === svc._id)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedServices.some((s) => s._id === svc._id)}
                    onChange={() => handleServiceToggle(svc)}
                    className="mt-1 h-5 w-5 text-secondary"
                  />
                  <div>
                    <p className="font-semibold">{svc.name}</p>
                    <p className="text-sm text-gray-500">{svc.description}</p>
                    <p className="text-secondary font-medium">{svc.price} kr</p>
                  </div>
                </label>
              ))}
            </div>
            <div className="text-right font-bold pt-2 text-secondary">Total: {totalPrice} kr</div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-xl font-semibold text-gray-700">Your Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="border p-3 rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="border p-3 rounded-md"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="border p-3 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Full Address"
                className="border p-3 rounded-md md:col-span-2"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                showTimeSelect
                timeIntervals={30}
                dateFormat="PPPPp"
                minDate={new Date()}
                placeholderText="Choose date & time"
                className="border p-3 rounded-md w-full md:col-span-2"
                excludeTimes={bookedTimes}
              />
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-xl font-semibold text-gray-700">Review & Confirm</h2>
            <div className="text-sm space-y-2">
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Phone:</strong> {phone}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Address:</strong> {address}</p>
              <p><strong>Date:</strong> {date?.toLocaleString()}</p>
              <p className="font-semibold">Selected Services:</p>
              <ul className="list-disc list-inside">
                {selectedServices.map((s) => (
                  <li key={s._id}>{s.name} – {s.price} kr</li>
                ))}
              </ul>
              <p className="text-right text-secondary font-bold">Total: {totalPrice} kr</p>
            </div>
          </>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
          >
            Back
          </button>
        )}
        {step < 4 ? (
          <button
            onClick={nextStep}
            className="bg-secondary hover:bg-blue-700 text-white px-6 py-2 rounded ml-auto"
            disabled={!validateStep(step)}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-primary text-white px-6 py-2 rounded ml-auto"
          >
            Confirm Booking
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
