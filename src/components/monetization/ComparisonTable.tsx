const ROWS = [
  { factor: 'Housing stress', coast: 'Higher', sunBelt: 'Varies', midwest: 'Often lower' },
  { factor: 'Job depth in niche industries', coast: 'Strong', sunBelt: 'Growing', midwest: 'Regional hubs' },
  { factor: 'Remote-friendliness', coast: 'High', sunBelt: 'High', midwest: 'Rising' },
]

export function ComparisonTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-white/5 text-left text-xs uppercase tracking-widest text-sky-200/80">
          <tr>
            <th className="px-4 py-3">Factor</th>
            <th className="px-4 py-3">Coastal metros</th>
            <th className="px-4 py-3">Sun Belt</th>
            <th className="px-4 py-3">Midwest</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.factor} className="border-t border-white/10 odd:bg-white/[0.02]">
              <td className="px-4 py-3 font-semibold text-slate-100">{r.factor}</td>
              <td className="px-4 py-3 text-slate-300">{r.coast}</td>
              <td className="px-4 py-3 text-slate-300">{r.sunBelt}</td>
              <td className="px-4 py-3 text-slate-300">{r.midwest}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-t border-white/10 bg-black/20 px-4 py-3 text-[11px] text-slate-500">
        Illustrative comparison—not a ranking. Validate with your own budget, industry, and family constraints.
      </div>
    </div>
  )
}
