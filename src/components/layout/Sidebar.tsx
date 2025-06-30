export default function Sidebar() {
  return (
    <div className="w-64 bg-white p-4 border-r shadow-sm h-screen">
      <h2 className="text-xl font-bold mb-4">TaskForge</h2>
      <nav className="space-y-2">
        <div className="text-gray-700 font-medium">My Tasks</div>
        <div className="text-gray-700 font-medium">Today</div>
        <div className="text-gray-700 font-medium">Upcoming</div>
      </nav>
    </div>
  );
}
