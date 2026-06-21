export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white dark:bg-slate-900 border rounded-2xl p-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-500">{title}</p>

          <h2 className="text-4xl font-bold mt-2">{value}</h2>
        </div>

        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}
