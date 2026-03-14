import { Metadata } from 'next'
import ProfessionistiContent from './ProfessionistiContent'

export const metadata: Metadata = {
  title: 'Per i Professionisti - Collabora con EcoLive',
  description:
    'Architetti, ingegneri e geometri: collabora con il sistema costruttivo X-Frame piu avanzato del Sud Italia. Supporto tecnico, materiale progettuale, BIM Revit.',
}

export default function ProfessionistiPage() {
  return <ProfessionistiContent />
}
