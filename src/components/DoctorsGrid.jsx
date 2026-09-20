import Reveal from './Reveal'
import DoctorCard from './DoctorCard'

export default function DoctorsGrid({ doctors }) {
  const columns = Math.max(1, Math.min(doctors.length, 3))

  return (
    <div
      className="grid gap-5 sm:gap-6"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {doctors.map((d, i) => (
        <Reveal key={d.id} delay={i * 80}>
          <DoctorCard doctor={d} />
        </Reveal>
      ))}
    </div>
  )
}
