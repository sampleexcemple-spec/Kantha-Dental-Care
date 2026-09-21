import Reveal from './Reveal'
import ServiceCard from './ServiceCard'

export default function ServicesGrid({ services }) {
  return (
    <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
      {services.map((s, i) => (
        <Reveal key={s.title} delay={i * 50}>
          <ServiceCard service={s} />
        </Reveal>
      ))}
    </div>
  )
}
