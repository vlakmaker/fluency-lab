import Navbar from '../components/NavBar'
import ExperimentForm from '../configs/ExperimentForm'
import { experiments } from '../configs/experiments'

export default function CrossDomainReframingPage() {
    const config = experiments.find(e => e.key === 'cross-domain-reframing')
    return (
        <>
            <Navbar />
            {config && <ExperimentForm config={config} />}
        </>
    )
}