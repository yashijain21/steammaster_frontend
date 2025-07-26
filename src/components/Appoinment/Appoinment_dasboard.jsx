import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FaCalendarAlt, FaTable, FaChartPie, FaUserClock, FaUserCheck, FaUserTimes, FaCalendarTimes, FaMoneyBillWave } from "react-icons/fa";
import { BsKanban, BsThreeDotsVertical } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AppointmentsDashboard = () => {
  const axios = useAxiosPublic();
  const [appointments, setAppointments] = useState([]);
  const [viewMode, setViewMode] = useState("calendar");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/appointments", {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });
      setAppointments(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch appointments:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const groupedByDate = appointments.reduce((acc, appt) => {
    const dateKey = new Date(appt.appointmentDate).toDateString();
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(appt);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedByDate).sort((a, b) => new Date(a) - new Date(b));

  const handleStatusUpdate = async (appointmentId, status) => {
    try {
      await axios.patch(`/appointments/status`, {
        id: appointmentId,
        status: status,
      });
      fetchAppointments();
      setShowModal(false);
    } catch (error) {
      console.error("❌ Error updating appointment status:", error);
    }
  };

  const getMetrics = () => {
    const scheduled = appointments.length;
    const attended = appointments.filter((a) => a.status === "attended").length;
    const cancelled = appointments.filter((a) => a.status === "cancelled").length;
    const noShow = appointments.filter((a) => a.status === "no_show").length;
    const overdue = appointments.filter((a) => {
      const apptDate = new Date(`${a.appointmentDate}T${a.appointmentTime}`);
      return new Date() > apptDate && !["attended", "cancelled", "no_show"].includes(a.status);
    }).length;

    return {
      scheduled,
      attended,
      cancelled,
      noShow,
      overdue,
      attendanceRate: scheduled ? ((attended / scheduled) * 100).toFixed(1) : 0,
      cancelRate: scheduled ? ((cancelled / scheduled) * 100).toFixed(1) : 0,
      noShowRate: scheduled ? ((noShow / scheduled) * 100).toFixed(1) : 0,
    };
  };

  const metrics = getMetrics();

  const statusColors = {
    pending: "bg-blue-100 text-blue-800",
    confirmed: "bg-purple-100 text-purple-800",
    attended: "bg-green-100 text-green-800",
    cancelled: "bg-yellow-100 text-yellow-800",
    no_show: "bg-red-100 text-red-800",
  };

  const getStatusColor = (status) => {
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 shadow bg-white z-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Appointments Dashboard</h1>
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto mt-3 md:mt-0">
          <button 
            onClick={() => setViewMode("calendar")} 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${viewMode === "calendar" ? "bg-indigo-600 text-white shadow-md" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
          >
            <FaCalendarAlt className="text-sm" /> Calendar
          </button>
          <button 
            onClick={() => setViewMode("table")} 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${viewMode === "table" ? "bg-indigo-600 text-white shadow-md" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
          >
            <FaTable className="text-sm" /> Table
          </button>
          <button 
            onClick={() => setViewMode("kanban")} 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${viewMode === "kanban" ? "bg-indigo-600 text-white shadow-md" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
          >
            <BsKanban className="text-sm" /> Kanban
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-7 gap-4 p-4">
        <MetricCard 
          icon={<FaUserClock className="text-blue-500" size={20} />} 
          title="Scheduled" 
          value={metrics.scheduled} 
          trend="up" 
          color="blue"
        />
        <MetricCard 
          icon={<FaUserCheck className="text-green-500" size={20} />} 
          title="Attended" 
          value={metrics.attended} 
          percentage={metrics.attendanceRate} 
          color="green"
        />
        <MetricCard 
          icon={<FaUserTimes className="text-yellow-500" size={20} />} 
          title="Cancelled" 
          value={metrics.cancelled} 
          percentage={metrics.cancelRate} 
          color="yellow"
        />
        <MetricCard 
          icon={<FaUserTimes className="text-red-500" size={20} />} 
          title="No Show" 
          value={metrics.noShow} 
          percentage={metrics.noShowRate} 
          color="red"
        />
        <MetricCard 
          icon={<FaCalendarTimes className="text-orange-500" size={20} />} 
          title="Overdue" 
          value={metrics.overdue} 
          color="orange"
        />
        <MetricCard 
          icon={<FaChartPie className="text-purple-500" size={20} />} 
          title="Attendance Rate" 
          value={`${metrics.attendanceRate}%`} 
          color="purple"
        />
        <MetricCard 
          icon={<FaMoneyBillWave className="text-teal-500" size={20} />} 
          title="Total Revenue" 
          value={`${appointments.reduce((sum, appt) => sum + (appt.totalPrice || 0), 0)} kr`} 
          color="teal"
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-auto p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : viewMode === "calendar" ? (
          <div className="w-full bg-white p-4 rounded-xl shadow-md">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              events={appointments.map((appt) => ({
                title: appt.customerName,
                start: `${new Date(appt.appointmentDate).toISOString().split("T")[0]}T${appt.appointmentTime}`,
                extendedProps: {
                  services: appt.serviceNames,
                  price: appt.totalPrice,
                  id: appt._id,
                  status: appt.status,
                },
                color: appt.status === 'attended' ? '#10B981' : 
                      appt.status === 'cancelled' ? '#F59E0B' : 
                      appt.status === 'no_show' ? '#EF4444' : '#3B82F6',
              }))}
              eventContent={renderEventContent}
              dateClick={(info) => setSelectedDate(info.date)}
              eventClick={(info) => {
                const id = info.event.extendedProps.id;
                const found = appointments.find((appt) => appt._id === id);
                setSelectedAppt(found);
                setShowModal(true);
              }}
              height="auto"
              eventBorderColor="transparent"
              eventDisplay="block"
              eventTimeFormat={{
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              }}
            />
            {showModal && selectedAppt && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-xl">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Appointment Details</h2>
                    <button 
                      onClick={() => setShowModal(false)} 
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <IoMdClose size={24} />
                    </button>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center">
                      <span className="w-24 text-gray-600">Name:</span>
                      <span className="font-medium">{selectedAppt.customerName}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-gray-600">Date:</span>
                      <span>{new Date(selectedAppt.appointmentDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-gray-600">Time:</span>
                      <span>{selectedAppt.appointmentTime}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-gray-600">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedAppt.status)}`}>
                        {selectedAppt.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-24 text-gray-600">Services:</span>
                      <span className="flex-1">{selectedAppt.serviceNames?.join(", ")}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-gray-600">Total:</span>
                      <span className="font-bold text-green-600">{selectedAppt.totalPrice} kr</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-4 border-t">
                    <button 
                      onClick={() => handleStatusUpdate(selectedAppt._id, "attended")} 
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Attended
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(selectedAppt._id, "cancelled")} 
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Cancelled
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(selectedAppt._id, "no_show")} 
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      No Show
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : viewMode === "table" ? (
          <div className="overflow-x-auto h-full bg-white rounded-xl shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appt) => (
                  <tr key={appt._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                          {appt.customerName.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{appt.customerName}</div>
                          <div className="text-sm text-gray-500">{appt.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(appt.appointmentDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">{appt.appointmentTime}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {appt.serviceNames?.join(", ")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      {appt.totalPrice} kr
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(appt.status)}`}>
                        {appt.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => handleStatusUpdate(appt._id, "attended")} 
                          className="text-green-600 hover:text-green-900"
                          title="Mark as Attended"
                        >
                          <FaUserCheck />
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(appt._id, "cancelled")} 
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Mark as Cancelled"
                        >
                          <FaUserTimes />
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(appt._id, "no_show")} 
                          className="text-red-600 hover:text-red-900"
                          title="Mark as No Show"
                        >
                          <FaCalendarTimes />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 min-h-[400px]">
            {sortedDates.map((date) => (
              <div key={date} className="min-w-[300px] flex-shrink-0 bg-white rounded-xl shadow p-4">
                <div className="sticky top-0 bg-white pb-2 z-10">
                  <h2 className="text-lg font-semibold text-gray-700">
                    {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </h2>
                  <p className="text-xs text-gray-500 mb-2">
                    {groupedByDate[date].length} appointment{groupedByDate[date].length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="space-y-3">
                  {groupedByDate[date].map((appt) => (
                    <div key={appt._id} className="p-3 border border-gray-200 rounded-lg shadow-xs hover:shadow-sm transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-800">{appt.customerName}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            <span className="font-medium">{appt.appointmentTime}</span> • {appt.serviceNames?.join(", ")}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(appt.status)}`}>
                            {appt.status.replace('_', ' ')}
                          </span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <BsThreeDotsVertical />
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                        <span className="text-sm font-semibold text-green-600">{appt.totalPrice} kr</span>
                        <div className="flex gap-1">
                          <button 
                            onClick={() => handleStatusUpdate(appt._id, "attended")} 
                            className="text-xs bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg transition-colors"
                            title="Attended"
                          >
                            <FaUserCheck size={12} />
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(appt._id, "cancelled")} 
                            className="text-xs bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-lg transition-colors"
                            title="Cancelled"
                          >
                            <FaUserTimes size={12} />
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(appt._id, "no_show")} 
                            className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg transition-colors"
                            title="No Show"
                          >
                            <FaCalendarTimes size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function renderEventContent(eventInfo) {
  return (
    <div className="flex flex-col text-xs p-1">
      <div className="font-semibold truncate">{eventInfo.event.title}</div>
      <div className="text-gray-500">{eventInfo.timeText}</div>
      <div className="truncate text-[0.7rem] mt-1">
        {eventInfo.event.extendedProps.services?.join(", ")}
      </div>
    </div>
  );
}

const MetricCard = ({ icon, title, value, percentage, trend, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-100',
    green: 'bg-green-50 border-green-100',
    yellow: 'bg-yellow-50 border-yellow-100',
    red: 'bg-red-50 border-red-100',
    orange: 'bg-orange-50 border-orange-100',
    purple: 'bg-purple-50 border-purple-100',
    teal: 'bg-teal-50 border-teal-100',
  };

  return (
    <div className={`p-4 rounded-xl border ${colorClasses[color] || 'bg-gray-50 border-gray-100'}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className="p-2 rounded-lg bg-white shadow-xs">
          {icon}
        </div>
      </div>
      {percentage && (
        <div className="mt-2 flex items-center text-xs">
          <span className={`font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {percentage}%
          </span>
          <span className="text-gray-500 ml-1">of total</span>
        </div>
      )}
    </div>
  );
};

export default AppointmentsDashboard;