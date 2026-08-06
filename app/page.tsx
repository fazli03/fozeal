import { Hero } from '@/components/home/hero'
import { WorkIndex } from '@/components/home/work-index'
import { Manifesto } from '@/components/home/manifesto'
import { Capabilities } from '@/components/home/capabilities'
import { Contact } from '@/components/site/contact'

/**
 * Reading order is the argument: what I do → what I made → how I think →
 * how I work → how to reach me. Work sits second because it is the only
 * section a recruiter is guaranteed to read.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <WorkIndex />
      <Manifesto />
      <Capabilities />
      <Contact />
    </>
  )
}
