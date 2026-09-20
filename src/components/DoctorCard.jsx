export default function DoctorCard({ doctor }) {
  return (
    <div
      className="group rounded-2xl bg-white/70 border-2 border-teal-800/10 p-3 sm:p-6 text-center
                 transition-all duration-300 ease-out
                 hover:-translate-y-1.5 hover:border-teal-700 hover:shadow-lg hover:shadow-teal-900/10"
    >
      <div className="w-16 h-16 sm:w-28 sm:h-28 mx-auto rounded-full overflow-hidden bg-teal-100 ring-4 ring-sand
                       transition-transform duration-300 group-hover:scale-105">
        {doctor.photo_url ? (
          <img src={doctor.photo_url} alt={doctor.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-teal-700/50 text-[10px] sm:text-xs px-1 text-center">
            No photo
          </div>
        )}
      </div>
      <h3 className="text-xs sm:text-lg text-teal-900 mt-2 sm:mt-4 leading-tight">{doctor.name}</h3>
      {doctor.qualification && (
        <p className="text-[9px] sm:text-xs uppercase tracking-wide text-gold-600 mt-1">{doctor.qualification}</p>
      )}
      {doctor.specialty && (
        <p className="text-[10px] sm:text-sm text-ink/70 mt-1 sm:mt-2 clamp-2 sm:line-clamp-none">{doctor.specialty}</p>
      )}
      {doctor.bio && (
        <p className="hidden sm:block text-sm text-ink/60 mt-2 leading-relaxed clamp-2">{doctor.bio}</p>
      )}
    </div>
  )
}
