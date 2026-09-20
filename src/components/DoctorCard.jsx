export default function DoctorCard({ doctor }) {
  return (
    <div className="border border-teal-800/10 rounded-sm overflow-hidden bg-white/70">
      <div className="aspect-[4/3] bg-teal-100">
        {doctor.photo_url ? (
          <img src={doctor.photo_url} alt={doctor.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-teal-700/50 text-sm">
            No photo yet
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg text-teal-900">{doctor.name}</h3>
        {doctor.qualification && (
          <p className="text-xs uppercase tracking-wide text-gold-600 mt-1">{doctor.qualification}</p>
        )}
        {doctor.specialty && (
          <p className="text-sm text-ink/70 mt-2">{doctor.specialty}</p>
        )}
        {doctor.bio && (
          <p className="text-sm text-ink/60 mt-2 leading-relaxed">{doctor.bio}</p>
        )}
      </div>
    </div>
  )
}
